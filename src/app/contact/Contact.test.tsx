import { render, screen } from '@testing-library/react';
import ContactForm from './page';

describe('Contact form renders', () => {
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
