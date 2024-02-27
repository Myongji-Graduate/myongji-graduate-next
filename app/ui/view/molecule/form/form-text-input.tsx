import TextInput from '../../atom/text-input/text-input';

type FormTextInputProps = {
  label: string;
  id: string;
  placeholder: string;
};

export function FormTextInput({ label, id, placeholder }: FormTextInputProps) {
  return (
    <>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <TextInput type={'text'} id={id} name={id} placeholder={placeholder} />
    </>
  );
}
