import { NextResponse } from 'next/server';
import { database } from '../../../services/database';

export async function GET() {
  console.log('GET /api/forms')
  const forms = database.getForms();

  const responsePayload = {
    success: true,
    forms
  }
  console.log('responsePayload', responsePayload)

  return NextResponse.json(responsePayload);
}