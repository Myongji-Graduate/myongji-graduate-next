import TextInput from '../../atom/text-input/text-input';

type FormPasswordInputProps = {
  label: string;
  id: string;
  placeholder: string;
};

export function FormPasswordInput({ label, id, placeholder }: FormPasswordInputProps) {
  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <TextInput type={'password'} id={id} name={id} placeholder={placeholder} />
    </>
  );
}
