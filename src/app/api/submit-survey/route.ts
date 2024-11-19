import { NextResponse } from 'next/server';
import { database } from '../../../services/database';

export async function POST(request: Request) {
  try {
    const { surveyId, responses } = await request.json();

    if (!surveyId || !responses) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const form = database.getForm(surveyId);
    if (!form) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      );
    }

    // Update form with responses
    const updatedForm = database.updateForm(surveyId, {
      responses: {
        ...(form.responses || {}),
        [new Date().toISOString()]: responses
      }
    });

    if (!updatedForm) {
      return NextResponse.json(
        { error: 'Failed to update form' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Survey submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting survey:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
