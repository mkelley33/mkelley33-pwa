import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import { ForwardedRef, forwardRef } from 'react';
import '@/components/forms/forms.css';

interface ITextInput {
  autoComplete?: string;
  id: string;
  errors: IErrors;
  label: string;
  type?: string;
  placeholder: string;
  multiline?: boolean;
  minRows?: number;
}

export const InnerTextInput = (
  { id, label, autoComplete, errors, type, placeholder, ...rest }: ITextInput,
  ref: ForwardedRef<typeof Input>
) => {
  return (
    <FormControl
      error={!!errors[id]?.message}
      variant="outlined"
      sx={{
        display: 'block',
        width: '340px',
        margin: '0 auto 1.25rem auto',
      }}
    >
      <TextField
        id={id}
        label={label}
        variant="outlined"
        inputRef={ref}
        InputProps={{ className: 'text-input' }}
        {...rest}
      />
      <FormHelperText id={`${id}-error-text`} style={{ textAlign: 'center' }}>
        {errors[id]?.message}
      </FormHelperText>
    </FormControl>
  );
};

const TextInput = forwardRef(InnerTextInput);

export default TextInput;
