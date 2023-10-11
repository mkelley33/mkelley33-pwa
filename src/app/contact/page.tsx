'use client';

import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextInput from '@/components/forms/TextInput';
import 'react-toastify/dist/ReactToastify.css';

// https://github.com/orgs/react-hook-form/discussions/10653
// https://github.com/orgs/react-hook-form/discussions/3099
// Another example of isValid not working:
// https://codesandbox.io/s/react-hook-form-validationschema-v6-forked-9ezus?file=/src/index.js
const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  message: yup.string().required('Message is required'),
});

interface IContactForm {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [token, setToken] = useState('');
  const [hCaptchaError, setHCaptchaError] = useState('');
  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<IContactForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const handleOnSubmit: SubmitHandler<IContactForm> = async (data) => {
    const res = await fetch('/api/contact/hcaptcha', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    const json = await res.json();

    if (!json.success) {
      setHCaptchaError('hCaptcha validation failed. Please try again.');
    }

    if (isValid && json.success) {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        router.push('/post-contact');
      } else if (json.error) {
        if (captchaRef.current) {
          // @ts-expect-error resetCaptcha does in fact exist on this ref
          captchaRef.current.resetCaptcha();
        }
        toast.error(json.error, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    }
  };

  return (
    <section style={{ textAlign: 'center' }}>
      <h1>Contact</h1>
      <form noValidate onSubmit={handleSubmit(handleOnSubmit)}>
        <TextInput
          id="firstName"
          label="First Name"
          placeholder="First Name"
          errors={errors as IErrors}
          {...register('firstName')}
        />
        <TextInput
          id="lastName"
          label="Last Name"
          placeholder="Last ame"
          errors={errors as IErrors}
          {...register('lastName')}
        />
        <TextInput
          id="email"
          type="email"
          label="Email"
          placeholder="Email"
          autoComplete="username email"
          errors={errors as IErrors}
          {...register('email')}
        />
        <TextInput
          id="message"
          label="Message"
          placeholder="Message"
          errors={errors as IErrors}
          multiline
          minRows={5}
          {...register('message')}
        />
        <FormControl error={!!hCaptchaError} variant="outlined">
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_H_CAPTCHA_SITE_KEY!}
            onVerify={setToken}
            onError={() => setToken('')}
            onExpire={() => setToken('')}
            ref={captchaRef}
            theme="dark"
          />
          <FormHelperText id="hcaptcha-settings-error-text">
            {hCaptchaError}
          </FormHelperText>
        </FormControl>
        <div className="mt-5">
          <Button
            type="submit"
            variant="contained"
            className="bg-slate-950"
            disabled={isSubmitting || !isDirty}
          >
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default ContactForm;
