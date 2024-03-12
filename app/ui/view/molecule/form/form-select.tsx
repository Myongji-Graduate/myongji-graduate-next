import Select from '../select';
import { FormContext } from './form.context';
import { useContext } from 'react';
import { useFormStatus } from 'react-dom';

interface FormSelectProps {
  label: string;
  id: string;
  options: { value: string; placeholder: string }[];
  placeholder: string;
  required?: boolean;
}

export const FormSelect = ({ label, id, options, placeholder, required = true }: FormSelectProps) => {
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
      <Select
        required={required}
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
    </div>
  );
};
