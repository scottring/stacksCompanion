import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function POST(request: Request) {
  try {
    const { formId, productName, signatures } = await request.json();

    // Send notification emails
    for (const signature of signatures) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: signature.email,
        subject: `Action Required: Product Release Form for ${productName}`,
        html: `
          <h2>Product Release Form Requires Your Attention</h2>
          <p>A new product release form for "${productName}" requires your signature as ${signature.role}.</p>
          <p>Please click the link below to review and sign the form:</p>
          <a href="${process.env.NEXT_PUBLIC_URL}/form/${formId}" style="display:inline-block;padding:12px 24px;background:#007bff;color:white;text-decoration:none;border-radius:4px;">
            Review Form
          </a>
        `
      });
    }

    return NextResponse.json({ 
      success: true,
      formId,
      message: 'Form created and notifications sent successfully'
    });
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { error: 'Failed to process form' },
      { status: 500 }
    );
  }
}