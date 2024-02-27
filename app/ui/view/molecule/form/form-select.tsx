import Select from '../select';

type FormSelectProps = {
  label: string;
  id: string;
  options: { value: string; placeholder: string }[];
  placeholder: string;
};

export const FormSelect = ({ label, id, options, placeholder }: FormSelectProps) => {
  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <Select id={id} name={id} placeholder={placeholder}>
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value} placeholder={option.placeholder} />
        ))}
      </Select>
    </>
  );
};
