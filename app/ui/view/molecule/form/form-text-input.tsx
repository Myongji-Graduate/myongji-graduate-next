import TextInput from '../../atom/text-input/text-input';
import { FormContext } from './form.context';
import { useContext } from 'react';

type FormTextInputProps = {
  label: string;
  id: string;
  placeholder: string;
};

export function FormTextInput({ label, id, placeholder }: FormTextInputProps) {
  const { errors } = useContext(FormContext);

  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <TextInput
        error={errors[id] ? true : false}
        errorMessages={errors[id]}
        type={'text'}
        id={id}
        name={id}
        placeholder={placeholder}
      />
    </>
  );
}
