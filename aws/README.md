# StudyPilot AWS Architecture & Serverless Scaffold

> **Current Status**: Scaffolded & Deploy-Ready (Local Node.js & Express currently active for development).

This directory contains standalone AWS Lambda function handlers prepared for future serverless deployment to AWS.

---

## Architecture Diagram

```
[Student Browser]
        │
   HTTPS│ (CloudFront CDN + S3 for SPA)
        ▼
[Amazon API Gateway]
 ├── POST /ai/ask       ──▶ [Lambda: ai-assistant] ──▶ [Amazon Bedrock (Claude 3 / Titan)]
 ├── POST /quiz/submit  ──▶ [Lambda: quiz]         ──▶ [Amazon DynamoDB (QuizAttempts)]
 └── GET  /progress     ──▶ [Lambda: progress]     ──▶ [Amazon DynamoDB (UserProgress)]
        │
 [Amazon Cognito] (User Authentication & JWT verification)
```

---

## Scaffolded Lambda Handlers

### 1. `aws/lambda/ai-assistant/index.js`
- **Trigger**: API Gateway `POST /api/ai/ask`
- **Runtime**: Node.js 20.x / 22.x
- **Action**: Marshals student queries, attaches system prompts, and queries Amazon Bedrock (`anthropic.claude-3-haiku` or `amazon.titan-text-express-v1`).
- **Required IAM Permissions**:
  - `bedrock:InvokeModel`

### 2. `aws/lambda/quiz/index.js`
- **Trigger**: API Gateway `POST /api/quiz/submit`
- **Runtime**: Node.js 20.x / 22.x
- **Action**: Validates quiz answers and computes exact whole-percentage scores (`3/3 = 100`, `2/3 = 67`, `1/3 = 33`, `0/3 = 0`).

### 3. `aws/lambda/progress/index.js`
- **Trigger**: API Gateway `GET /api/progress`
- **Runtime**: Node.js 20.x / 22.x
- **Action**: Computes aggregate metrics including total topics completed, overall average quiz score, and daily active streaks.

---

## Deployment with AWS SAM / CDK

When transitioning from the local Express server to full AWS Serverless:

1. Package Lambdas into zip archives or deploy container images via Amazon ECR.
2. Create an Amazon API Gateway REST/HTTP API with Cognito Authorizers.
3. Provision DynamoDB tables for `StudyPilotUsers`, `StudyPilotProgress`, and `StudyPilotQuizAttempts`.
4. Deploy the frontend build directory to an Amazon S3 bucket fronted by Amazon CloudFront with SSL.
