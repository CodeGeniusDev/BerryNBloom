import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  logger: true,
  debug: true
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error verifying email configuration:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Email templates
const contactEmailTemplate = (data) => {
  const subject = `New Contact Form Submission: ${data.subject || 'Inquiry'}`;
  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F4F4F4; padding: 24px; color: #1E1E1E;">
      <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #9C2A2A; padding: 16px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600;">Berry & Bloom Contact</h1>
        </div>
        <!-- Content -->
        <div style="padding: 24px;">
          <h2 style="color: #9C2A2A; font-size: 20px; font-weight: 600; margin-bottom: 16px;">New Contact Form Submission</h2>
          <div style="background-color: #F4F4F4; padding: 16px; border-radius: 6px; margin-bottom: 16px;">
            <p style="margin: 0 0 12px; font-size: 16px;"><strong style="color: #1E1E1E;">Name:</strong> ${data.name || 'Not provided'}</p>
            <p style="margin: 0 0 12px; font-size: 16px;"><strong style="color: #1E1E1E;">Email:</strong> <a href="mailto:${data.email}" style="color: #af7df5; text-decoration: none;">${data.email || 'Not provided'}</a></p>
            <p style="margin: 0 0 12px; font-size: 16px;"><strong style="color: #1E1E1E;">Subject:</strong> ${data.subject || 'No subject'}</p>
            <p style="margin: 0 0 12px; font-size: 16px;"><strong style="color: #1E1E1E;">Message:</strong></p>
            <p style="background-color: #ffffff; padding: 12px; border-radius: 4px; font-size: 14px; line-height: 1.5; color: #1E1E1E; white-space: pre-line;">${data.message || 'No message provided'}</p>
          </div>
          <a href="https://www.berryandbloom.com" style="display: inline-block; background-color: #9C2A2A; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px; margin-top: 16px;">
            Visit Our Website
          </a>
        </div>
        <!-- Footer -->
        <div style="background-color: #F4F4F4; padding: 16px; text-align: center; border-top: 1px solid #dee2e6;">
          <p style="color: #1E1E1E; font-size: 12px; margin: 0;">
            Sent from the Berry & Bloom Contact Form | <a href="https://www.berryandbloom.com" style="color: #af7df5; text-decoration: none;">berryandbloom.com</a>
          </p>
          <p style="color: #1E1E1E; font-size: 12px; margin: 8px 0 0;">
            123 Orchard Lane, Meadowville, CA 90210
          </p>
        </div>
      </div>
    </div>
  `;

  const text = `New Contact Form Submission
----------------------------
Name: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Subject: ${data.subject || 'No subject'}

Message:
${data.message || 'No message provided'}

This email was sent from the Berry & Bloom contact form.
Visit us at: https://www.berryandbloom.com`;

  return {
    to: 'codegenius.inc@gmail.com',
    subject: subject,
    text: text,
    html: html
  };
};

const distributorEmailTemplate = (data) => {
  const subject = `New Distributor Application: ${data.subject || 'New Application'}`;
  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F4F4F4; padding: 24px; color: #1E1E1E;">
      <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #9C2A2A; padding: 16px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600;">Berry & Bloom Distributor Application</h1>
        </div>
        <!-- Content -->
        <div style="padding: 24px;">
          <h2 style="color: #9C2A2A; font-size: 20px; font-weight: 600; margin-bottom: 16px;">New Distributor Application</h2>
          <div style="background-color: #F4F4F4; padding: 16px; border-radius: 6px; margin-bottom: 16px;">
            <p style="margin: 0 0 12px; font-size: 16px;"><strong style="color: #1E1E1E;">Business Name:</strong> ${data.subject || 'Not provided'}</p>
            <p style="margin: 0 0 12px; font-size: 16px;"><strong style="color: #1E1E1E;">Contact Person:</strong> ${data.name || 'Not provided'}</p>
            <p style="margin: 0 0 12px; font-size: 16px;"><strong style="color: #1E1E1E;">Email:</strong> <a href="mailto:${data.email}" style="color: #af7df5; text-decoration: none;">${data.email || 'Not provided'}</a></p>
            <p style="margin: 0 0 12px; font-size: 16px;"><strong style="color: #1E1E1E;">Business Details:</strong></p>
            <p style="background-color: #ffffff; padding: 12px; border-radius: 4px; font-size: 14px; line-height: 1.5; color: #1E1E1E; white-space: pre-line;">${data.message || 'No details provided'}</p>
          </div>
          <a href="https://www.berryandbloom.com/distributors" style="display: inline-block; background-color: #9C2A2A; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px; margin-top: 16px;">
            Learn About Our Distributor Program
          </a>
        </div>
        <!-- Footer -->
        <div style="background-color: #F4F4F4; padding: 16px; text-align: center; border-top: 1px solid #dee2e6;">
          <p style="color: #1E1E1E; font-size: 12px; margin: 0;">
            Sent from the Berry & Bloom Distributor Application | <a href="https://www.berryandbloom.com" style="color: #af7df5; text-decoration: none;">berryandbloom.com</a>
          </p>
          <p style="color: #1E1E1E; font-size: 12px; margin: 8px 0 0;">
            123 Orchard Lane, Meadowville, CA 90210
          </p>
        </div>
      </div>
    </div>
  `;

  const text = `New Distributor Application
---------------------------
Business Name: ${data.subject || 'Not provided'}
Contact Person: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}

Business Details:
${data.message || 'No details provided'}

This is a distributor application from the Berry & Bloom website.
Visit us at: https://www.berryandbloom.com`;

  return {
    to: 'codegenius.inc@gmail.com',
    subject: subject,
    text: text,
    html: html
  };
};

// Email sending functions
export const sendContactEmail = async (data) => {
  try {
    console.log('Preparing to send contact email with data:', JSON.stringify(data, null, 2));
    const mailOptions = {
      ...contactEmailTemplate(data),
      from: `"Berry & Bloom" <${process.env.EMAIL_USER}>`,
    };
    
    console.log('Sending email with options:', JSON.stringify({
      ...mailOptions,
      text: mailOptions.text?.substring(0, 100) + '...',
      html: mailOptions.html?.substring(0, 100) + '...',
    }, null, 2));
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending contact email:', {
      error: error.message,
      stack: error.stack,
      response: error.response,
      code: error.code,
      command: error.command
    });
    throw new Error(`Failed to send contact email: ${error.message}`);
  }
};

export const sendDistributorEmail = async (data) => {
  try {
    console.log('Preparing to send distributor email with data:', JSON.stringify(data, null, 2));
    const mailOptions = {
      ...distributorEmailTemplate(data),
      from: `"Berry & Bloom" <${process.env.EMAIL_USER}>`,
    };
    
    console.log('Sending distributor email with options:', JSON.stringify({
      ...mailOptions,
      text: mailOptions.text?.substring(0, 100) + '...',
      html: mailOptions.html?.substring(0, 100) + '...',
    }, null, 2));
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Distributor email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending distributor email:', {
      error: error.message,
      stack: error.stack,
      response: error.response,
      code: error.code,
      command: error.command
    });
    throw new Error(`Failed to send distributor email: ${error.message}`);
  }
};