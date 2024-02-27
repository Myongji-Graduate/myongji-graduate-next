import { FormRoot } from './form-root';
import { FormTextInput } from './form-text-input';
import { FormSelect } from './form-select';
import { FormPasswordInput } from './form-password-input';
import { FormNumberInput } from './form-number-input';

const Form = Object.assign(FormRoot, {
  TextInput: FormTextInput,
  Select: FormSelect,
  NumberInput: FormNumberInput,
  PasswordInput: FormPasswordInput,
});

export default Form;
