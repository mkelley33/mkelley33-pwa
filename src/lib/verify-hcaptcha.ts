export const verifyHCaptcha = async (token: string | undefined): Promise<{ error: string; success: boolean }> => {
  const res = await fetch('/api/contact/hcaptcha/', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  return (await res.json()) as { error: string; success: boolean };
};
