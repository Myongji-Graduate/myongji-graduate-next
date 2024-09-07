import { TableHeader } from './table-header';
import { ColType } from '../grid/grid-root';
import List from '../list';
import Grid from '../grid';
import { ListRow } from '../list/list-root';
import SwipeToDelete from '../swipe/swipe-to-delete';
import { ReactNode } from 'react';

interface TableProps<T extends ListRow> {
  headerInfo: string[];
  data: T[];
  renderActionButton?: (id: number) => JSX.Element;
  swipeable?: boolean;
  emptyDataRender?: () => ReactNode;
}

interface SwipeableTableProps<T extends ListRow> extends TableProps<T> {
  swipeable: true;
  onSwipeAction: (lectureId: number) => void;
}

interface BasicTableProps<T extends ListRow> extends TableProps<T> {
  swipeable?: false;
  onSwipeAction?: never;
}

function isCol(cols: number | string): cols is ColType {
  if (cols === 3 || cols === 4 || cols === 5 || cols === 6 || cols === 'render-button') {
    return true;
  }
  return false;
}

export function Table<T extends ListRow>({
  data,
  headerInfo,
  renderActionButton,
  swipeable = false,
  onSwipeAction,
  emptyDataRender,
}: SwipeableTableProps<T> | BasicTableProps<T>) {
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

  const swipeableRender = (item: T, index: number) => {
    return (
      <div className="border-solid border-gray-300 border-b-[1px] last:border-b-0" key={index}>
        <SwipeToDelete
          onSwipeAction={() => {
            onSwipeAction && onSwipeAction(item.id);
          }}
        >
          <List.Row>
            <Grid cols={isCol(cols) ? cols : 6}>
              {Object.keys(item).map((key, index) => {
                if (key === 'id') return null;
                return <Grid.Column key={index}>{item[key]}</Grid.Column>;
              })}
            </Grid>
          </List.Row>
        </SwipeToDelete>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-2.5 w-full" data-testid="table-data">
      <TableHeader headerInfo={headerInfo} cols={isCol(cols) ? cols : 6} />
      <List data={data} render={swipeable ? swipeableRender : render} emptyDataRender={emptyDataRender} />
    </div>
  );
}
