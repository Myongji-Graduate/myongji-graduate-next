import { TableHeader } from './table-header';
import { ColType } from '../grid/grid-root';
import List from '../list';
import Grid from '../grid';

type TableProps = {
  headerInfo: string[];
  data: string[][];
  actionButton?: JSX.Element;
};

function isCol(cols: number): cols is ColType {
  if (cols === 3 || cols === 4 || cols === 5 || cols === 6) {
    return true;
  }
  return false;
}

export function Table({ data, headerInfo, actionButton }: TableProps) {
  const cols = actionButton ? headerInfo.length + 1 : headerInfo.length;

  const render = (item: string[]) => {
    return (
      <List.Row>
        <Grid cols={isCol(cols) ? cols : 6}>
          {item.map((info) => (
            <Grid.Column key={info}>{info}</Grid.Column>
          ))}
          {actionButton ? <Grid.Column>{actionButton}</Grid.Column> : null}
        </Grid>
      </List.Row>
    );
  };

  return (
    <div className="flex flex-col gap-2.5 w-[800px]">
      <TableHeader headerInfo={headerInfo} cols={isCol(cols) ? cols : 6} />
      <List data={data} render={render}></List>
    </div>
  );
}
