# StudyPilot 🚀

> **"Learn Smarter. Practice Better. Grow Faster."**

StudyPilot is a full-stack, AI-assisted student learning platform built with React, Vite, Node.js, Express, and Amazon Bedrock integration with an intelligent local knowledge engine fallback. It guides students through technical subjects across Cloud Computing, Modern Programming, and Full-Stack Web Development.

---

## 📸 Platform Architecture & Visual Design

StudyPilot adheres to a modern, student-focused educational SaaS interface:
- **Theme**: Deep navy canvas (`#070B14`, `#0B1120`, `#0E1A38`) with vivid cyan (`#38BDF8`) and indigo/purple gradients.
- **Components**: Glassmorphism cards with frosted backdrops, glowing status rings, and responsive multi-device navigation.
- **Mascot**: Original SVG StudyPilot AI Robot mentor providing real-time technical guidance and intuitive analogies.

---

## ⚡ Core Learning Journey

```
Learn ──▶ Practice ──▶ Evaluate ──▶ Track ──▶ Improve
  │           │           │          │          │
  ▼           ▼           ▼          ▼          ▼
Structured  Interactive Instant    Streak &   AI-Guided
Topics      Quizzes     Scores &   Curriculum Review &
& Code      Per Subject Analytics  Progress   Simpler Analogies
```

---

## 🛠️ Tech Stack

### Frontend Single-Page Application (SPA)
- **Framework**: React 18
- **Tooling & Bundler**: Vite 6
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom glassmorphism and gradient tokens
- **Icons**: Lucide React
- **State & Session**: React Context API (`AuthContext`) with persistent JWT handling

### Backend API & Services
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 4
- **Security**: `bcryptjs` for salted password hashing, JWT session verification, centralized non-leaking error handling
- **Database Architecture**: Clean decoupled Data Access Object (DAO) pattern with atomic file persistence, pre-engineered for direct migration to Amazon DynamoDB
- **AI Integration**: AWS SDK for JavaScript v3 (`@aws-sdk/client-bedrock-runtime`) with Amazon Bedrock runtime invocation
- **AI Fallback Engine**: Comprehensive local technical knowledge engine delivering detailed explanations and "Explain simpler" analogies for AWS, Python, Java, and Web Development

### AWS Cloud & Serverless (Scaffolded & Deploy-Ready)
- **Amazon Bedrock**: Foundational model invocation (`anthropic.claude-3-haiku`, `amazon.titan-text-express-v1`)
- **AWS Lambda Handlers**:
  - `aws/lambda/ai-assistant/index.js`
  - `aws/lambda/quiz/index.js`
  - `aws/lambda/progress/index.js`

---

## 📁 Monorepo Folder Structure

```
studypilot/
│
├── frontend/                     # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/           # Navbar, Sidebar, ProtectedRoute, RobotIllustration, StatCard, SubjectCard
│   │   ├── pages/                # 12 functional routes (Landing, Login, Signup, Dashboard, Topics, Quizzes, AI...)
│   │   ├── layouts/              # MainLayout (with responsive sidebar), AuthLayout
│   │   ├── services/             # api.js client with token management and proxy routing
│   │   ├── hooks/                # useAuth custom hook
│   │   ├── context/              # AuthContext session provider
│   │   ├── styles/               # index.css with Tailwind & glassmorphism classes
│   │   ├── App.jsx               # Top-level React Router configuration
│   │   └── main.jsx              # DOM entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── backend/                      # Node.js + Express API Backend
│   ├── src/
│   │   ├── routes/               # Modular Express routers (auth, subject, quiz, progress, ai)
│   │   ├── controllers/          # Business logic and input validation
│   │   ├── services/             # bedrockService, localAiKnowledge, aiService, dbService
│   │   ├── middleware/           # authMiddleware (JWT), errorHandler
│   │   ├── data/                 # seedData (AWS Cloud, Python, Java, Web Dev) & storage/
│   │   └── server.js             # Express application entry point
│   ├── tests/                    # Automated test suites (17 passing unit & integration tests)
│   ├── package.json
│   └── .env.example
│
├── aws/                          # Serverless & Cloud Infrastructure Scaffolding
│   ├── lambda/
│   │   ├── ai-assistant/         # Bedrock AI Lambda handler
│   │   ├── quiz/                 # Quiz score & percentage calculation Lambda handler
│   │   └── progress/             # Student progress tracking Lambda handler
│   └── README.md                 # Serverless deployment blueprint
│
├── package.json                  # Root monorepo script runner
├── .gitignore                    # Comprehensive secrets & artifact ignore rules
└── README.md                     # Project documentation
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js v18+ (tested on Node v24 LTS)
- npm v9+

### 1. Installation
Install all dependencies across root, backend, and frontend with a single command:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Configure Environment Variables
Copy `.env.example` in the `backend` folder:

```bash
cp backend/.env.example backend/.env
```

`backend/.env` contents:
```ini
PORT=5000
NODE_ENV=development
JWT_SECRET=studypilot_dev_secret_key_change_in_production_9982347
JWT_EXPIRES_IN=7d

# Amazon Bedrock AI Integration (Optional: Leave blank to use built-in local knowledge engine)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
```

> **Note**: If AWS credentials are left blank, StudyPilot automatically activates its rich local knowledge engine. No application crash will ever occur.

### 3. Run the Development Servers

You can run both backend and frontend concurrently:
```bash
npm run dev
```

Or run each service individually:
- **Backend**: `npm run backend` (Runs on `http://localhost:5000`)
- **Frontend**: `npm run frontend` (Runs on `http://localhost:3000`)

### 4. Demo Student Account
A pre-seeded student account is available out of the box:
- **Email**: `student@studypilot.edu`
- **Password**: `studypilot123`
*(You can also click the sample demo credentials button on the login screen, or sign up with a new account).*

---

## 🧪 Automated Testing

StudyPilot includes a test suite covering percentage math, password hashing, topic completion, quiz history aggregation, and AI fallback behavior.

Run the test suite:
```bash
npm test
```

### Verified Test Results (17/17 Passing):
- **Quiz Percentage Math**:
  - `3/3 = 100%`
  - `2/3 = 67%`
  - `1/3 = 33%`
  - `0/3 = 0%`
  - Division by zero guarded (`0/0 = 0%`)
- **Authentication & Security**:
  - Passwords hashed with bcrypt (never plaintext)
  - Duplicate email collision detection
  - Session issuance and verification
- **Curriculum Operations**:
  - Subject retrieval across all 4 subjects
  - Topic lookup with explanations and quiz questions
- **Progress Tracking**:
  - Topic completion count incrementation (idempotent)
  - Running average score calculation across quiz attempts
- **AI Assistant**:
  - Technical lesson delivery via local engine
  - "Explain simpler" student analogy generation
  - Graceful handling of unknown topics and empty queries

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | Service health status and Bedrock readiness | No |
| `POST` | `/api/auth/signup` | Register new student (`{ name, email, password }`) | No |
| `POST` | `/api/auth/login` | Authenticate student (`{ email, password }`) | No |
| `GET` | `/api/auth/me` | Fetch active student profile & progress | Yes (JWT) |
| `GET` | `/api/subjects` | List all available subjects with topic counts | No |
| `GET` | `/api/subjects/:id` | Fetch subject details, topics, and quiz pool | No |
| `GET` | `/api/topics/:id` | Fetch full topic lesson, code example, and quiz | No |
| `POST` | `/api/topics/:id/complete` | Mark topic as completed and increment streak | Yes (JWT) |
| `POST` | `/api/quiz/submit` | Submit quiz score, calculate percentage, log history | Optional/Yes |
| `GET` | `/api/quiz/history` | Retrieve user's previous quiz attempts | Yes (JWT) |
| `GET` | `/api/progress` | Get overall completion %, streak, and subject breakdown | Yes (JWT) |
| `POST` | `/api/ai/ask` | Ask AI assistant question with optional topic context | No |

---

## 🤖 Amazon Bedrock Integration & Local Fallback

### How the AI Abstraction Works
The application uses an abstraction layer (`aiService.js`):
1. **Bedrock Check**: Inspects `process.env.AWS_ACCESS_KEY_ID` and `process.env.AWS_SECRET_ACCESS_KEY`.
2. **Bedrock Invocation**: If configured, issues an `InvokeModelCommand` to the Bedrock runtime using model `anthropic.claude-3-haiku` or `amazon.titan-text-express-v1`. Returns `{ answer, source: "bedrock" }`.
3. **Graceful Fallback**: If credentials are unset or the cloud call times out, automatically routes to `localKnowledgeBase`. Returns `{ answer, source: "local" }`.
4. **Explain Simpler**: Converts technical descriptions into beginner-friendly analogies.

---

## 🔒 Security Best Practices
- **No Hardcoded Credentials**: Secrets are strictly read via environment variables.
- **Git Hygiene**: `.env`, `.sqlite`, and build directories are strictly ignored by `.gitignore`.
- **Bcrypt Password Protection**: Plaintext passwords are never persisted.
- **Information Leak Prevention**: Production error handler conceals internal stack traces.

---

## ☁️ Free Production Deployment on Render

StudyPilot includes a pre-configured `render.yaml` blueprint for 1-click free deployment of both backend and frontend.

### Option A: 1-Click Blueprint (Recommended)
1. Push your repository to GitHub.
2. Log into [Render](https://render.com) and click **New +** ➔ **Blueprint**.
3. Connect your repository. Render will automatically detect `render.yaml` and provision:
   - **Backend Web Service** (`studypilot-backend` on Node runtime)
   - **Frontend Static Site** (`studypilot-frontend` on Static Site runtime with SPA routing rewrites)
4. Click **Apply**.

### Option B: Manual Setup in Render Dashboard

#### 1. Backend Web Service
- **Name**: `studypilot-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT`: `10000` (Render default)
  - `NODE_ENV`: `production`
  - `CLIENT_URL`: `https://your-frontend-subdomain.onrender.com` (or `*`)
  - `JWT_SECRET`: `<generate-a-strong-random-secret>`
  - `JWT_EXPIRES_IN`: `7d`

#### 2. Frontend Static Site
- **Name**: `studypilot-frontend`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://your-backend-subdomain.onrender.com`
- **Redirects / Rewrites**:
  - `/*` ➔ `/index.html` (Rewrite, 200) for React Router SPA navigation.

---

## 🗺️ Roadmap & Deployment Transparency

| Feature / Service | Current State | AWS Production Target |
| :--- | :---: | :--- |
| **Frontend Web App** | ✅ Built & Functional | Amazon S3 + CloudFront CDN |
| **Backend REST API** | ✅ Built & Functional (Express) | Amazon API Gateway + AWS Lambda |
| **Authentication** | ✅ Built & Functional (Bcrypt + JWT) | Amazon Cognito User Pools |
| **Data Storage** | ✅ Built & Functional (DAO / JSON) | Amazon DynamoDB Single-Table Design |
| **AI Assistant** | ✅ Functional (Local Engine active) | Amazon Bedrock Claude 3 / Titan |
| **Serverless Handlers** | ✅ Scaffolded in `aws/lambda/` | Deployable via AWS SAM / CDK |
