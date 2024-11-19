import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  console.log('Status change received:', new Date().toISOString());
  console.log('Request body:', body);
  
  return NextResponse.json({ 
    success: true, 
    message: 'Status change logged successfully' 
  });
}