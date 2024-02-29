import Select from '../select';
import { FormContext } from './form.context';
import { useContext } from 'react';
import { useFormStatus } from 'react-dom';

type FormSelectProps = {
  label: string;
  id: string;
  options: { value: string; placeholder: string }[];
  placeholder: string;
};

export const FormSelect = ({ label, id, options, placeholder }: FormSelectProps) => {
  const { errors } = useContext(FormContext);
  const { pending } = useFormStatus();

  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <Select
        disabled={pending}
        error={errors[id] ? true : false}
        errorMessages={errors[id]}
        id={id}
        name={id}
        placeholder={placeholder}
      >
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value} placeholder={option.placeholder} />
        ))}
      </Select>
    </>
  );
};
