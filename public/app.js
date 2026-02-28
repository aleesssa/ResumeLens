import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// FIREBASE CONFIG
  const firebaseConfig = {
    apiKey: "AIzaSyB5buoRkB8ImY0wJPGTVIsaZhCqAO1vilw",
    authDomain: "resumelens-820b6.firebaseapp.com",
    projectId: "resumelens-820b6",
    storageBucket: "resumelens-820b6.firebasestorage.app",
    messagingSenderId: "359959414111",
    appId: "1:359959414111:web:4d7ad94cc49273345d22ea"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// PROMPT
function buildPrompt(resumeText, role) {
  return `
You are an ATS resume screening AI.

Analyze this resume for the role: ${role}.

Return raw JSON only. Do not wrap in triple backticks or markdown code blocks.

Return STRICT JSON only in this format:

{
  "overall_score": number (0-100),
  "risk_level": "Low" | "Medium" | "High",
  "top_issues": ["..."],
  "improvements": ["..."]
}

Resume:
"""${resumeText}"""
  `.trim();
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// send API request
async function callGemini(apiKey, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 }
      })
    }
  );

  const data = await response.json();
  console.log("Gemini response:", data);

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function callGeminiWithRetry(apiKey, prompt) {
  try {
    return await callGemini(apiKey, prompt);
  } catch (err) {
    if (String(err).includes("429")) {
      await sleep(1500);
      return await callGemini(apiKey, prompt);
    }
    throw err;
  }
}

function renderResult(parsed) {
  return `
    <div class="card">
      <h2>Score: ${parsed.overall_score}</h2>
      <p><strong>Risk:</strong> ${parsed.risk_level}</p>

      <h3>Top Issues</h3>
      <ul>${parsed.top_issues.map(i => `<li>${i}</li>`).join("")}</ul>

      <h3>Improvements</h3>
      <ul>${parsed.improvements.map(i => `<li>${i}</li>`).join("")}</ul>
    </div>
  `;
}

document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const btn = document.getElementById("analyzeBtn");
  const apiKey = "AIzaSyDeabFwCcC7YitFy6IRnRXhjNQuCtdfREE";
  const resume = document.getElementById("resume").value.trim();
  const role = document.getElementById("role").value;
  const output = document.getElementById("output");

  if (!apiKey || !resume) {
    alert("Please enter API key and resume text.");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Analyzing...";
  output.innerHTML = "<p>Analyzing...</p>";

  try {
    // Reduce token usage
    const trimmedResume = resume.replace(/\s+/g, " ").slice(0, 8000);

    const prompt = buildPrompt(trimmedResume, role);
    const raw = await callGeminiWithRetry(apiKey, prompt);

    if (!raw) {
      throw new Error("Empty response from Gemini.");
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      output.innerHTML = `<pre>Non-JSON Response:\n${raw}</pre>`;
      btn.disabled = false;
      btn.textContent = "Analyze Resume";
      return;
    }

    output.innerHTML = renderResult(parsed);

    // Save to Firestore
    await addDoc(collection(db, "analyses"), {
      role,
      result: parsed,
      createdAt: serverTimestamp()
    });

  } catch (err) {
    console.error("Error:", err);
    output.innerHTML = `<pre>Error:\n${err}</pre>`;
  }

  btn.disabled = false;
  btn.textContent = "Analyze Resume";
});