import TextInput from '../../atom/text-input/text-input';
import { FormContext } from './form.context';
import { useContext } from 'react';

type FormNumberInputProps = {
  label: string;
  id: string;
  placeholder: string;
};

export function FormNumberInput({ label, id, placeholder }: FormNumberInputProps) {
  const { errors } = useContext(FormContext);

  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <TextInput
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
