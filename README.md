# ResumeLens

AI-Powered Resume Risk Analysis & Job Description Matching

## 🌍 SDG Alignment

**SDG 8 – Decent Work and Economic Growth**

ResumeLens supports SDG 8 by improving employability readiness among students and fresh graduates. It reduces the gap between applicants and AI-driven hiring systems by simulating ATS-style resume screening and identifying structural, contextual, and role-specific weaknesses before job submission.

## 📌 Problem Statement

Modern hiring pipelines increasingly rely on AI-powered Applicant Tracking Systems (ATS) to filter resumes before recruiters review them.

**Many students and fresh graduates:**
- Receive automated rejections without feedback
- Do not understand how ATS systems evaluate resumes
- Fail to tailor resumes to specific job descriptions
- Miss important keywords required for screening
- Do not quantify achievements effectively

This creates an invisible barrier to employment. ResumeLens addresses this by providing structured AI-driven resume evaluation and role-aligned improvement guidance.

## 💡 Solution Overview

ResumeLens simulates AI-based resume screening using Google Gemini.

**The system allows users to:**
- Paste resume text
- Select a target job role
- Optionally paste a specific job description
- Receive structured evaluation results

**The AI generates:**
- Overall resume score (0–100)
- Hiring risk level (Low / Medium / High)
- Top issues with resume evidence snippets
- Actionable improvements with rewrite examples
- (When provided) Alignment analysis with job description

Results are parsed into structured JSON and rendered into a clean evaluation interface. Evaluations are stored in Firestore for persistence and analytics.

## 🧠 AI Integration (Core Evaluation Engine)

ResumeLens integrates:
- Gemini 2.5 Flash-Lite
- Structured prompt engineering to enforce strict JSON output
- Evidence extraction from resume text
- Role-aware evaluation logic
- Job description comparison (optional mode)
- Output sanitization and markdown stripping
- Strict JSON parsing with fallback handling

## 🔒 Secure Cloud Architecture

ResumeLens uses a production-style cloud architecture:
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

**Why Cloud Run?**
- Protects Gemini API key (not exposed to browser)
- Handles AI request logic securely
- Sanitizes and extracts JSON safely
- Prepares the system for scaling

## 🏗 Technical Architecture

### Frontend
- Firebase Hosting
- Vanilla JavaScript
- Resume + Job Description input handling
- JSON parsing & UI rendering
- Firestore persistence

### Backend (Cloud Run)
- Express.js API
- Secure API key stored as environment variable
- Prompt builder logic
- Gemini API request handling
- Markdown code block removal
- Robust JSON extraction

### Database
- Firestore
- Stores evaluation records with timestamp
- Structured nested result storage

## 🛠 Tech Stack

- Firebase Hosting
- Firestore Database
- Google Cloud Run
- Google Cloud Build
- Artifact Registry
- Gemini 2.5 Flash-Lite
- Google Cloud Project (Billing enabled)
- JavaScript (Frontend)
- Node.js + Express (Backend)

## ⚙ Implementation Highlights

- Token trimming to control API usage
- Strict JSON schema enforcement
- Markdown code-fence stripping
- JSON object extraction logic
- Retry handling for rate limits
- API key isolation using Cloud Run
- Conditional Job Description comparison
- Structured nested Firestore storage

## 🚧 Challenges Faced

- Gemini model deprecation and version changes
- Free-tier quota limitations
- Billing activation for AI API access
- Handling Markdown-wrapped JSON responses
- Extracting valid JSON from non-deterministic LLM output
- Implementing secure API key storage
- CORS configuration between Cloud Run and Firebase

## 📊 Impact Potential

Testing revealed common resume issues such as:
- Lack of quantified achievements
- Missing project sections
- Weak role-specific tailoring
- Generic summary statements
- Absence of required job keywords

ResumeLens helps users identify these structural weaknesses before submission, improving job readiness and alignment with AI-based hiring systems.

## 🚀 Future Roadmap

- Allow PDF resume upload with server-side text extraction
- Add resume-to-job-description match scoring
- Improve keyword alignment scoring logic
- Add user accounts with analysis history tracking
- Build role-specific scoring calibration
- Add analytics dashboard for university career centers
- Implement rate limiting and authentication for production security

## 🔗 Live Demo

[https://resumelens-820b6.web.app/](https://resumelens-820b6.web.app/)

## 👥 Team

**Team Name:** melogi

**Hackathon:** 2026 Submission
