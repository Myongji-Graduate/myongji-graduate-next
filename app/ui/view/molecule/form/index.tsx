import { FormRoot } from './form-root';
import { FormTextInput } from './form-text-input';
import { FormSelect } from './form-select';

const Form = Object.assign(FormRoot, {
  TextInput: FormTextInput,
  Select: FormSelect,
});

export default Form;
