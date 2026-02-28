# ResumeLens

**AI-Powered Resume Risk Analysis for Job Readiness**

## 🌍 SDG Alignment

**SDG 8 – Decent Work and Economic Growth**

ResumeLens supports SDG 8 by improving employability readiness among students and fresh graduates. It helps users identify resume weaknesses before applying for jobs, increasing their chances of passing AI-based applicant screening systems.

## 📌 Problem Statement

Modern hiring processes increasingly rely on AI-powered Applicant Tracking Systems (ATS) to filter resumes before a recruiter reviews them.

Many students:
- Receive rejection without feedback
- Lack awareness of ATS expectations
- Fail to tailor resumes to specific roles
- Do not quantify achievements effectively

This creates an invisible barrier to employment. ResumeLens addresses this gap by providing structured AI-driven resume risk analysis and actionable improvements.

## 💡 Solution Overview

ResumeLens simulates AI resume screening using Google Gemini to:
- Generate an overall resume score (0–100)
- Classify hiring risk level (Low / Medium / High)
- Identify structural and contextual weaknesses
- Provide role-specific improvement suggestions

The system returns structured JSON output which is parsed and rendered into a clean evaluation card.

## 🧠 AI Integration (Core Technology)

ResumeLens integrates:
- Gemini 2.5 Flash-Lite via Google's Generative Language API
- Structured prompt engineering to enforce JSON outputs
- Error handling, retry logic, and token trimming
- Strict output parsing to convert LLM response into evaluable data

AI is the core evaluation engine of ResumeLens — not just a text generator.

## 🏗 Technical Architecture

```
User Input (Resume Text + Target Role)
            ↓
Frontend (JavaScript, Hosted on Firebase)
            ↓
Gemini API (Google Generative Language API)
            ↓
Structured JSON Output
            ↓
Parser & UI Rendering
            ↓
Firestore Storage
```

## 🛠 Tech Stack

- Firebase Hosting
- Firestore Database
- Google Cloud Project (Billing-enabled for AI quota)
- Gemini 2.5 Flash-Lite
- JavaScript (Frontend)
- Prompt Engineering + Structured Output Handling

## ⚙ Implementation Highlights

- Token trimming to control API usage
- Structured JSON enforcement
- Markdown code-block stripping logic
- Retry handling for 429 rate limits
- Firestore persistence for analytics

## 🚧 Challenges Faced

- Gemini model deprecation handling
- Free-tier quota limitations
- Billing activation for AI API access
- Parsing JSON responses wrapped in Markdown fences
- Rate limit handling and request cooldown logic

## 📊 Impact Potential

During testing, common resume weaknesses detected included:
- Lack of quantified achievements
- Missing project sections
- Weak role-specific tailoring
- Generic summary statements

By identifying these issues early, ResumeLens improves employment readiness and supports workforce competitiveness.

## 🚀 Future Roadmap

- Allow users to upload resumes as PDF files instead of pasting text
- Compare resumes directly against specific job descriptions
- Add keyword alignment checks based on selected job roles
- Improve scoring consistency using evaluation calibration
- Develop a simple dashboard for university career centers to identify common resume weaknesses among students
- Secure the API key using a backend service such as Cloud Run for production deployment

## 🔗 Live Demo

https://resumelens-820b6.web.app/

## 👥 Team

**Team Name:** melogi

**Submission:** Hackathon 2026
