import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Thank you',
};

const PostContact = () => {
  return (
    <section>
      <h1>Thank you</h1>
      <p>Your message has been sent.</p>
    </section>
  );
};

export default PostContact;
