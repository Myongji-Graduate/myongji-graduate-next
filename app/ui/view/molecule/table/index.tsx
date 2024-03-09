import { TableHeader } from './table-header';
import { ColType } from '../grid/grid-root';
import List from '../list';
import Grid from '../grid';
import { ListRow } from '../list/list-root';

interface TableProps {
  headerInfo: string[];
  data: ListRow[];
  renderActionButton?: (id: number) => JSX.Element;
}

function isCol(cols: number): cols is ColType {
  if (cols === 3 || cols === 4 || cols === 5 || cols === 6) {
    return true;
  }
  return false;
}

export function Table({ data, headerInfo, renderActionButton }: TableProps) {
  const cols = renderActionButton ? headerInfo.length + 1 : headerInfo.length;

  const render = (item: ListRow, index: number) => {
    return (
      <List.Row key={index}>
        <Grid cols={isCol(cols) ? cols : 6}>
          {Object.keys(item).map((key, index) => {
            if (key === 'id') return null;
            return <Grid.Column key={index}>{item[key]}</Grid.Column>;
          })}
          {renderActionButton ? <Grid.Column>{renderActionButton(item.id)}</Grid.Column> : null}
        </Grid>
      </List.Row>
    );
  };

  return (
    <div className="flex flex-col gap-2.5 w-full" data-testid="table-data">
      <TableHeader headerInfo={headerInfo} cols={isCol(cols) ? cols : 6} />
      <List data={data} render={render} />
    </div>
  );
}
