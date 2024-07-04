import TextInput from '../../atom/text-input/text-input';
import { FormContext } from './form.context';
import { useContext } from 'react';
import { useFormStatus } from 'react-dom';

interface FormTextInputProps {
  label: string;
  id: string;
  placeholder: string;
  required?: boolean;
  value?: string;
}

export function FormTextInput({ label, id, value, placeholder, required = false }: FormTextInputProps) {
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
        required={required}
        disabled={pending}
        error={errors[id] ? true : false}
        errorMessages={errors[id]}
        type={'text'}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
