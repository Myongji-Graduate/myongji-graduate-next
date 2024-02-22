import { TableHeader } from './table-header';
import { TableRoot } from './table-root';

const Table = Object.assign(TableRoot, {
  Header: TableHeader,
});

export default Table;
