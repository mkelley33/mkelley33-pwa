import ContactFormContainer from './ConcactFormContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return <ContactFormContainer />;
}
