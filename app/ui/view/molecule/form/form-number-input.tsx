import TextInput from '../../atom/text-input/text-input';
import { FormContext } from './form.context';
import { useContext } from 'react';
import { useFormStatus } from 'react-dom';

type FormNumberInputProps = {
  label: string;
  id: string;
  placeholder: string;
};

export function FormNumberInput({ label, id, placeholder }: FormNumberInputProps) {
  const { errors } = useContext(FormContext);
  const { pending } = useFormStatus();

  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <TextInput
        disabled={pending}
        error={errors[id] ? true : false}
        errorMessages={errors[id]}
        type={'number'}
        id={id}
        name={id}
        placeholder={placeholder}
      />
    </>
  );
}
