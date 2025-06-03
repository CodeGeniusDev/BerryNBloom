import dotenv from 'dotenv';
import { sendContactEmail } from './src/services/emailService.js';

dotenv.config();

async function testEmail() {
  try {
    console.log('Testing email service...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email',
      message: 'This is a test email from the Berry & Bloom contact form.'
    };
    
    console.log('Sending test email...');
    await sendContactEmail(testData);
    console.log('Test email sent successfully!');
  } catch (error) {
    console.error('Error sending test email:', error);
  } finally {
    process.exit();
  }
}

testEmail();
