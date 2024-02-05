import { useRef, useState } from 'react';

const useHCaptcha = () => {
  const [token, setToken] = useState('');
  const [hCaptchaError, setHCaptchaError] = useState('');
  const captchaRef = useRef(null);

  return { token, setToken, hCaptchaError, setHCaptchaError, captchaRef };
};

export default useHCaptcha;
