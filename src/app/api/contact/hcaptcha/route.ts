import { verify } from 'hcaptcha';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const json = await req.json();
  const secret = process.env.H_CAPTCHA_SECRET!;
  const { success } = await verify(secret, json.token);
  return NextResponse.json({ success });
}
