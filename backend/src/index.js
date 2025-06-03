import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendContactEmail, sendDistributorEmail } from './services/emailService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Send email
    await sendContactEmail({ name, email, subject, message });
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing contact form' 
    });
  }
});

// Distributor form endpoint
app.post('/api/distributor', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Send email
    await sendDistributorEmail({ name, email, subject, message });
    
    res.status(200).json({ 
      success: true, 
      message: 'Distributor application submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing distributor form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing distributor application' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
