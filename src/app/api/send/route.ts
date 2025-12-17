import { NextResponse, NextRequest } from 'next/server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email.length > 254) return false;

  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (message.length < 50 || message.length > 600) {
      return NextResponse.json({ error: 'Message must be between 50 and 600 characters' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (subject.length < 8 || subject.length > 120) {
      return NextResponse.json({ error: 'Subject must be between 8 and 120 characters' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio message <onboarding@resend.dev>',
      to: ['juanjo5792@gmail.com'],
      subject: subject,
      replyTo: email,
      text: `From ${email}: ${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 })

  } catch (error) {
    console.error('Error in send API:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
