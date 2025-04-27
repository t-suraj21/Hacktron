# Women's Safety App

This application provides a platform to ensure women's safety through emergency alerts, harassment reporting, and access to resources. It integrates features such as an AI chatbot, emergency contacts, and live location sharing with nearby police stations.

## Project Structure

This project includes both **Frontend** (React) and **Backend** (Node.js with Express) in the same repository.

/Women's-Safety-App ├── /client # Frontend (React) files │ ├── /public │ ├── /src │ ├── package.json │ └── .env ├── /server # Backend (Node.js) files │ ├── /models │ ├── /routes │ ├── /controllers │ ├── app.js │ ├── package.json │ └── .env └── README.md

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- MongoDB or an instance of MongoDB Atlas (for database)
- Twilio Account (for emergency calls and messages)

## Installation Guide

Follow these steps to set up both frontend and backend locally.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Womens-Safety-App.git
cd Womens-Safety-App


.env file:
MONGO_URI=your-mongo-db-uri
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
CHATBOT_API_KEY=your-chatbot-api-key
JWT_SECRET=your-jwt-secret

Frontend Features
Home Page: Display introductory information and links to register or log in.

Login / Register: Forms to register and authenticate users.

Emergency Alerts: Send immediate alerts to emergency contacts and the police.

Harassment Report: Submit reports of online harassment.

Profile: View and update personal details and emergency contacts.

AI Chatbot: Access a chatbot for help during emergencies (with an API key).

Backend Features
User Authentication: Register, login, and authenticate users using JWT tokens.

Emergency Call: Integration with Twilio to send emergency calls and messages to contacts.

Chatbot API: Handle chatbot messages to trigger emergency alerts and help connect with advocates.

MongoDB Integration: Store user data, including emergency contacts and report data.

API Endpoints
POST /api/auth/register: Register a new user.

POST /api/auth/login: Login an existing user and return a JWT token.

GET /api/auth/profile: Get the user's profile data (requires JWT token).

POST /api/call: Send an emergency call and message.

POST /api/chatbot: Send messages to the AI chatbot and receive responses (with valid API key).

Tech Stack
Frontend: React, React Router, Tailwind CSS

Backend: Node.js, Express.js, JWT Authentication, Twilio API

Database: MongoDB (via Mongoose)

APIs: Twilio for SMS and Voice, Custom Chatbot API

Troubleshooting
If the API Key is invalid, ensure that the correct API key is configured in both the frontend and backend environment files.

If you encounter a CORS error, ensure CORS is properly configured in the backend to allow requests from the frontend.



---

### Key Points to Update in the README:

1. **API URLs**: Ensure that your frontend `REACT_APP_API_URL` in `.env` matches your backend API endpoint.
2. **Twilio API Keys**: Don't forget to fill in the Twilio account credentials.
3. **Chatbot API Key**: Fill in the appropriate `CHATBOT_API_KEY` for your chatbot integration.

---

Let me know if you need any changes or further adjustments!










