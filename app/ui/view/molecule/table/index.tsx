import { TableHeader } from './table-header';
import { ColType } from '../grid/grid-root';
import List from '../list';
import Grid from '../grid';
import { ListRow } from '../list/list-root';
import { SwipeableListItem } from 'react-swipeable-list';
import '@/app/utils/style/reactswipeable-list.css';
import SwipeableCustomList from '../list/swipeable-custom-list';

interface TableProps<T extends ListRow> {
  headerInfo: string[];
  data: T[];
  renderActionButton?: (id: number) => JSX.Element;
  swipeable?: boolean;
}

function isCol(cols: number | string): cols is ColType {
  if (cols === 3 || cols === 4 || cols === 5 || cols === 6 || cols === 'render-button') {
    return true;
  }
  return false;
}

export function Table<T extends ListRow>({ data, headerInfo, renderActionButton, swipeable = false }: TableProps<T>) {
  const cols = renderActionButton && !swipeable ? 'render-button' : headerInfo.length;

  const render = (item: T, index: number) => {
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

  const swipealbeRender = (item: T, index: number) => {
    return (
      <SwipeableListItem trailingActions={renderActionButton ? renderActionButton(item.id) : null}>
        <List.Row key={index}>
          <Grid cols={isCol(cols) ? cols : 6}>
            {Object.keys(item).map((key, index) => {
              if (key === 'id') return null;
              return <Grid.Column key={index}>{item[key]}</Grid.Column>;
            })}
          </Grid>
        </List.Row>
      </SwipeableListItem>
    );
  };
  return (
    <div className="flex flex-col gap-2.5 w-full" data-testid="table-data">
      <TableHeader headerInfo={headerInfo} cols={isCol(cols) ? cols : 6} />
      {swipeable ? <SwipeableCustomList data={data} render={swipealbeRender} /> : <List data={data} render={render} />}
    </div>
  );
}
