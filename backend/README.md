# Berry & Bloom - Backend Server

This is the backend server for handling contact and distributor form submissions for the Berry & Bloom website.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail app password (generate one at https://myaccount.google.com/apppasswords)

3. **Start the Server**
   - Development:
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```

## API Endpoints

- `POST /api/contact` - Handle contact form submissions
- `POST /api/distributor` - Handle distributor application form submissions
- `GET /health` - Health check endpoint

## Environment Variables

- `PORT` - Server port (default: 3001)
- `EMAIL_USER` - Gmail address for sending emails
- `EMAIL_PASS` - Gmail app password
- `FRONTEND_URL` - URL of the frontend (for CORS)
