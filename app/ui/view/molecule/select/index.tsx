import { SelectRoot } from './select-root';
import { SelectItem } from './select-item';

const Select = Object.assign(SelectRoot, {
  Item: SelectItem,
});

export default Select;
