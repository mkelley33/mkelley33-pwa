import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { render, screen } from '@testing-library/react';
import ContactForm from './page';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { NextRouterWrapper } from '@/NextRouterWrapper';
describe('Contact form renders', () => {
  const mockAppInstance: DeepMockProxy<AppRouterInstance> =
    mockDeep<AppRouterInstance>();

  beforeEach(() => {
    jest
      .spyOn(NextRouterWrapper, 'getAppRouter')
      .mockReturnValue(mockAppInstance);
  });
  it('Renders the form fields', () => {
    render(<ContactForm />);
    expect(
      screen.getByRole('heading', { name: /contact/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });
});
