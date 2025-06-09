import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
// You'll need to set this in your environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is not configured');
      return NextResponse.json(
        { error: 'Contact form is temporarily unavailable. Please try again later or reach out via email.' },
        { status: 503 }
      );
    }

    // Validate SendGrid API key format
    if (!process.env.SENDGRID_API_KEY.startsWith('SG.')) {
      console.error('Invalid SendGrid API key format');
      return NextResponse.json(
        { error: 'Contact form is temporarily unavailable. Please try again later or reach out via email.' },
        { status: 503 }
      );
    }

    // Prepare email content
    const msg = {
      to: 'ionescurares2003@gmail.com', // Changed to your accessible email
      from: 'ionescurares2003@gmail.com', // Changed to your verified sender email
      replyTo: email,
      subject: `Portfolio Contact Form: Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await sgMail.send(msg);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Handle specific SendGrid errors
    if (error.response?.body?.errors) {
      const sendgridError = error.response.body.errors[0];
      if (sendgridError.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Contact form is temporarily unavailable. Please try again later or reach out via email.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
} 