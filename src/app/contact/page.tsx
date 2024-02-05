'use client';

import { useRef, useState } from 'react';

import ContactForm from './ContactForm';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import useHCaptcha from '@/hooks/useHCaptcha';

export const sendEmail = async (data: IContactFormData): Promise<{ error: string; success: boolean }> => {
  try {
    const res = await fetch(`/api/contact`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const body = await res.json();

    return body as { error: string; success: boolean };
  } catch (e) {
    return { error: '', success: false };
  }
};

export const verifyHCaptcha = async (token: string | undefined): Promise<{ error: string; success: boolean }> => {
  const res = await fetch('/api/contact/hcaptcha/', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  return (await res.json()) as { error: string; success: boolean };
};

const ContactFormContainer = () => {
  const { token, setToken, hCaptchaError, setHCaptchaError, captchaRef } = useHCaptcha();

  return (
    <ContactForm
      sendEmail={sendEmail}
      verifyHCaptcha={verifyHCaptcha}
      token={token}
      captchaRef={captchaRef}
      setHCaptchaError={setHCaptchaError}
      hCaptchaError={hCaptchaError}
    >
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_H_CAPTCHA_SITE_KEY!}
        onVerify={setToken}
        onError={() => setToken('')}
        onExpire={() => setToken('')}
        ref={captchaRef}
        theme="dark"
      />
    </ContactForm>
  );
};

export default ContactFormContainer;
