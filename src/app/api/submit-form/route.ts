import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  try {
    const { formId, productName, signatures } = await request.json();

    // Send notification emails
    for (const signature of signatures) {
      const msg = {
        to: signature.email,
        from: process.env.SENDGRID_FROM_EMAIL || '', // verified sender email
        subject: `Action Required: Product Release Form for ${productName}`,
        html: `
          <h2>Product Release Form Requires Your Attention</h2>
          <p>A new product release form for "${productName}" requires your signature as ${signature.role}.</p>
          <p>Please click the link below to review and sign the form:</p>
          <a href="${process.env.NEXT_PUBLIC_URL}/form/${formId}" style="display:inline-block;padding:12px 24px;background:#007bff;color:white;text-decoration:none;border-radius:4px;">
            Review Form
          </a>
        `
      };

      await sgMail.send(msg);
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
