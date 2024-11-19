import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.use(cors());
app.use(express.json());

// Verify Bubble.io webhook signature
const verifyBubbleSignature = (req) => {
  const signature = req.headers['x-bubble-signature'];
  if (!signature) return false;

  const hmac = crypto.createHmac('sha256', process.env.BUBBLE_WEBHOOK_SECRET);
  const digest = hmac.update(JSON.stringify(req.body)).digest('hex');
  return signature === digest;
};

// Send notification emails
const sendNotificationEmail = async (email, role, productName, formUrl) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Action Required: Product Release Form for ${productName}`,
    html: `
      <h2>Product Release Form Requires Your Attention</h2>
      <p>A new product release form for "${productName}" requires your signature as ${role}.</p>
      <p>Please click the link below to review and sign the form:</p>
      <a href="${formUrl}" style="display:inline-block;padding:12px 24px;background:#007bff;color:white;text-decoration:none;border-radius:4px;">
        Review Form
      </a>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Status change endpoint
app.post('/status-change', (req, res) => {
  console.log('Status change received:', new Date().toISOString());
  console.log('Request body:', req.body);
  res.json({ success: true, message: 'Status change logged successfully' });
});

// Endpoint to receive webhook from Bubble.io
app.post('/api/trigger-survey', async (req, res) => {
  if (!verifyBubbleSignature(req)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { productName, productId, status, signatures } = req.body;
  
  // Create new form instance
  const formId = crypto.randomUUID();
  const formUrl = `${process.env.FRONTEND_URL}/form/${formId}`;

  // Notify all required signers
  try {
    for (const signature of signatures) {
      await sendNotificationEmail(signature.email, signature.role, productName, formUrl);
    }

    res.json({ 
      success: true, 
      formId,
      formUrl 
    });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ error: 'Failed to process form' });
  }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});