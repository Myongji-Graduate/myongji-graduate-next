import { ListRoot } from './list-root';
import { ListRow } from './list-row';

const List = Object.assign(ListRoot, {
  Row: ListRow,
});

export default List;
