import { NextResponse } from 'next/server';
import transporter from '@/lib/transporter';

export const dynamic = 'force-dynamic';

interface IEmail {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

async function sendContactEmail({
  firstName,
  lastName,
  email,
  message,
}: IEmail) {
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: 'New contact message', // Subject line
    text: `From: ${firstName} ${lastName}\n
  ${email}\n
  ${message}\n
      `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve({ success: true });
      }
    });
  });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const response = await sendContactEmail(json);
    return NextResponse.json(response);
  } catch {
    // TODO: log sending email error
    return NextResponse.json({
      error: 'Something went wrong. Please try again.',
    });
  }
}
