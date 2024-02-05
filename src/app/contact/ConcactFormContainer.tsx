'use client';

import ContactForm from './ContactForm';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { sendEmail } from '@/lib/send-email';
import useHCaptcha from '@/hooks/useHCaptcha';
import { verifyHCaptcha } from '@/lib/verify-hcaptcha';

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
