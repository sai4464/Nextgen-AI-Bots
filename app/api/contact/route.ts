import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role, message } = body;

    // Log the contact form submission to console
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Role:', role);
    console.log('Message:', message);
    console.log('=====================================');

    // In a real implementation, you would:
    // - Validate the input data
    // - Store in database
    // - Send notification emails
    // - Integrate with CRM systems

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process contact form' 
      },
      { status: 500 }
    );
  }
}