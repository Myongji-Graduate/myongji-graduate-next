import TextInput from '../../atom/text-input/text-input';

type FormNumberInputProps = {
  label: string;
  id: string;
  placeholder: string;
};

export function FormNumberInput({ label, id, placeholder }: FormNumberInputProps) {
  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <TextInput type={'number'} id={id} name={id} placeholder={placeholder} />
    </>
  );
}
