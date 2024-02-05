'use client';

import 'react-toastify/dist/ReactToastify.css';

import * as yup from 'yup';

import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { NextRouterWrapper } from '@/NextRouterWrapper';
import TextInput from '@/components/forms/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  message: yup.string().required('Message is required'),
});

export interface IContactForm {
  sendEmail: (data: IContactFormData) => Promise<{ error: string; success: boolean }>;
  verifyHCaptcha: (token: string | undefined) => Promise<{ error: string; success: boolean }>;
  setHCaptchaError?: Dispatch<SetStateAction<string>>;
  hCaptchaError?: string;
  token?: string;
  captchaRef?: MutableRefObject<null>;
  children?: React.ReactNode;
}

const ContactForm = ({
  sendEmail,
  verifyHCaptcha,
  setHCaptchaError,
  hCaptchaError,
  token,
  captchaRef,
  children,
}: IContactForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<IContactFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const router = NextRouterWrapper.getAppRouter();

  const handleOnSubmit: SubmitHandler<IContactFormData> = async (data) => {
    let json: { error: string; success: boolean } = await verifyHCaptcha(token);

    if (!json.success && setHCaptchaError) {
      setHCaptchaError('hCaptcha validation failed. Please try again.');
    }

    if (isValid && json.success) {
      json = await sendEmail(data);

      if (json.success) {
        router.push('/post-contact');
      } else if (json.error) {
        if (captchaRef?.current) {
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
          placeholder="Last Name"
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
          {children}
          <FormHelperText id="hcaptcha-settings-error-text">{hCaptchaError}</FormHelperText>
        </FormControl>
        <div className="mt-5">
          <Button
            name="contactFormSubmitButton"
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
