import { GridColumn } from './grid-column';
import { GridRoot } from './grid-root';

const Grid = Object.assign(GridRoot, {
  Column: GridColumn,
});

export default Grid;
