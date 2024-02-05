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
