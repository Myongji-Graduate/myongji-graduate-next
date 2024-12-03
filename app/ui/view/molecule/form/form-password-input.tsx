import TextInput from '../../atom/text-input/text-input';
import { FormInputProps } from './form-root';
import { FormContext } from './form.context';
import { useContext } from 'react';
import { useFormStatus } from 'react-dom';

interface FormPasswordInputProps extends FormInputProps {}

export function FormPasswordInput({ label, id, placeholder, autoFocus, required = false }: FormPasswordInputProps) {
  const { errors } = useContext(FormContext);
  const { pending } = useFormStatus();

  return (
    <div className="group">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium group-has-[:required]:after:pl-1 group-has-[:required]:after:content-['*'] group-has-[:required]:after:text-red-400"
      >
        {label}
      </label>
      <TextInput
        autoFocus={autoFocus}
        required={required}
        disabled={pending}
        error={errors[id] ? true : false}
        errorMessages={errors[id]}
        type={'password'}
        id={id}
        name={id}
        placeholder={placeholder}
      />
    </div>
  );
}
