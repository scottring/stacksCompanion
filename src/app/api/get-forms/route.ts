import { NextResponse } from 'next/server';
import { database } from '../../../services/database';

export async function GET() {
  try {
    console.log('GET /api/forms');
    const forms = await database.getForms();

    const responsePayload = {
      success: true,
      forms
    };
    console.log('responsePayload', responsePayload);

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('Error getting forms:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
