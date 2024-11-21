import { NextResponse } from 'next/server';
import { database } from '../../../services/database';

export const revalidate = 0

export async function GET() {
  console.log('GET /api/forms');
  try {
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
