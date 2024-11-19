import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { nanoid } from 'nanoid';
import { database } from '../../../services/database';
import { defaultProductReleaseForm } from '../../../data/defaultForm';
import { Form } from '../../../types/form';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productName, productId, recipients, status } = body;

    // Verify this is coming from Bubble.io with an "Approved" status
    if (status !== 'Approved') {
      return NextResponse.json(
        { error: 'Invalid status. Must be "Approved"' },
        { status: 400 }
      );
    }

    if (!productName || !productId || !recipients || !Array.isArray(recipients)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new form based on the template
    const newForm: Form = {
      ...defaultProductReleaseForm,
      id: nanoid(),
      title: `Product Release Form - ${productName}`,
      productId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      signatures: recipients.map(email => ({
        id: nanoid(),
        role: 'Reviewer',
        name: '',
        email,
        signed: false
      }))
    };

    // Store the form in our database
    const savedForm = database.createForm(newForm);

    // Create form URL
    const formUrl = `${process.env.NEXT_PUBLIC_URL}/form/${savedForm.id}`;

    // Send emails to all recipients
    const emailPromises = recipients.map(async (recipient: string) => {
      const msg = {
        to: recipient,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: `Survey Request for ${productName}`,
        html: `
          <h2>Please Complete the Product Release Survey</h2>
          <p>A product release survey has been created for ${productName}.</p>
          <p>Please click the link below to complete the survey:</p>
          <a href="${formUrl}">${formUrl}</a>
        `,
      };

      return sgMail.send(msg);
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ 
      success: true, 
      message: 'Form created and emails sent successfully',
      formId: savedForm.id,
      formUrl 
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
