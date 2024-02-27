import { FormRoot } from './form-root';
import { FormTextInput } from './form-text-input';

const Form = Object.assign(FormRoot, {
  TextInput: FormTextInput,
});

export default Form;
