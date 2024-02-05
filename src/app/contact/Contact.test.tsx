import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { render, screen } from '@testing-library/react';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ContactForm from './ContactForm';
import { NextRouterWrapper } from '@/NextRouterWrapper';
import { jest } from '@jest/globals';
import { sendEmail } from '@/lib/send-email';
import { setup } from '@/lib/test-helper';
import { verifyHCaptcha } from '@/lib/verify-hcaptcha';

describe('Contact form renders', () => {
  const mockAppInstance: DeepMockProxy<AppRouterInstance> = mockDeep<AppRouterInstance>();

  beforeEach(() => {
    jest.spyOn(NextRouterWrapper, 'getAppRouter').mockReturnValue(mockAppInstance);
  });

  it('Renders the form fields', () => {
    const mockSendEmail = jest.fn<typeof sendEmail>();
    mockSendEmail.mockImplementation((data: IContactFormData) => Promise.resolve({ error: '', success: true }));
    const mockVerifyHCaptcha = jest.fn<typeof verifyHCaptcha>();
    mockVerifyHCaptcha.mockImplementation((token: string | undefined) => Promise.resolve({ error: '', success: true }));
    render(<ContactForm sendEmail={mockSendEmail} verifyHCaptcha={mockVerifyHCaptcha} />);

    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('Submits the form successfully', async () => {
    const mockSendEmail = jest.fn<typeof sendEmail>();
    mockSendEmail.mockImplementation((data: IContactFormData) => Promise.resolve({ error: '', success: true }));
    const mockVerifyHCaptcha = jest.fn<typeof verifyHCaptcha>();
    mockVerifyHCaptcha.mockImplementation((token: string | undefined) => Promise.resolve({ error: '', success: true }));
    const mockSetHCaptchaError = jest.fn();
    mockSetHCaptchaError.mockImplementation((string) => string);

    const { user } = setup(
      <ContactForm
        sendEmail={mockSendEmail}
        verifyHCaptcha={mockVerifyHCaptcha}
        token="fake-token"
        setHCaptchaError={mockSetHCaptchaError}
      />,
    );

    const firstNameInput = await screen.findByLabelText('First Name');
    await user.type(firstNameInput, 'Ceschi');

    const lastNameInput = await screen.findByLabelText('Last Name');
    await user.type(lastNameInput, 'Ramos');

    const emailInput = await screen.findByLabelText('Email');
    await user.type(emailInput, 'test@test.com');

    const messageInput = await screen.findByLabelText('Message');
    await user.type(messageInput, 'Message');

    const submitButton = await screen.findByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(mockVerifyHCaptcha).toHaveBeenCalledWith('fake-token');
    expect(mockSetHCaptchaError).not.toHaveBeenCalled();
    expect(mockSendEmail).toHaveBeenCalledWith({
      email: 'test@test.com',
      firstName: 'Ceschi',
      lastName: 'Ramos',
      message: 'Message',
    });
  });

  it('Sets hCaptcha errors when verifyHCaptcha isnt successful', async () => {
    const mockSendEmail = jest.fn<typeof sendEmail>();
    mockSendEmail.mockImplementation((data: IContactFormData) => Promise.resolve({ error: '', success: true }));
    const mockVerifyHCaptcha = jest.fn<typeof verifyHCaptcha>();
    mockVerifyHCaptcha.mockImplementation((token: string | undefined) =>
      Promise.resolve({ error: 'error', success: false }),
    );
    const mockSetHCaptchaError = jest.fn();
    mockSetHCaptchaError.mockImplementation((string) => string);

    const { user } = setup(
      <ContactForm
        sendEmail={mockSendEmail}
        verifyHCaptcha={mockVerifyHCaptcha}
        token="fake-token"
        setHCaptchaError={mockSetHCaptchaError}
      />,
    );

    const firstNameInput = await screen.findByLabelText('First Name');
    await user.type(firstNameInput, 'Sam');

    const lastNameInput = await screen.findByLabelText('Last Name');
    await user.type(lastNameInput, 'King');

    const emailInput = await screen.findByLabelText('Email');
    await user.type(emailInput, 'test@test.com');

    const messageInput = await screen.findByLabelText('Message');
    await user.type(messageInput, 'Message');

    const submitButton = await screen.findByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(mockVerifyHCaptcha).toHaveBeenCalledWith('fake-token');
    expect(mockSetHCaptchaError).toHaveBeenCalled();
    expect(mockSendEmail).not.toHaveBeenCalledWith({
      email: 'test@test.com',
      firstName: 'Sam',
      lastName: 'King',
      message: 'Message',
    });
  });
});
