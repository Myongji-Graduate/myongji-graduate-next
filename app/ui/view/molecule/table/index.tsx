import { TableHeader } from './table-header';
import { ColType } from '../grid/grid-root';
import List from '../list';
import Grid from '../grid';
import { ListRow } from '../list/list-root';
import SwipeToDelete from '../swipe/swipe-to-delete';
import { ReactNode } from 'react';
import TableWithModal from './table-with-modal';
import { DialogKey } from '@/app/utils/key/dialog-key.util';

interface TableProps<T extends ListRow> {
  headerInfo: string[];
  data: T[];
  renderActionButton?: (item: T) => JSX.Element;
  swipeable?: boolean;
  emptyDataRender?: () => ReactNode;
  nonRenderableKey?: string[]; // 테이블에 렌더링 하지 않을 키 값
  lastContentRef?: React.Ref<HTMLDivElement>;
}

interface SwipeableTableProps<T extends ListRow> extends TableProps<T> {
  swipeable: true;
  onSwipeAction: (item: T) => void;
}

interface BasicTableProps<T extends ListRow> extends TableProps<T> {
  swipeable?: false;
  onSwipeAction?: never;
}

interface ModalableTableProps<T extends ListRow> extends TableProps<T> {
  onClick?: (item: T) => void;
  swipeable?: false;
  renderModal: (item: T, close: () => void) => ReactNode;
  onSwipeAction?: never;
  modalKey?: DialogKey;
}

function isCol(cols: number | string): cols is ColType {
  if (cols === 3 || cols === 4 || cols === 5 || cols === 6 || cols === 9 || cols === 'render-button') {
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
  nonRenderableKey = ['id'],
  lastContentRef,
  ...rest
}: SwipeableTableProps<T> | BasicTableProps<T> | ModalableTableProps<T>) {
  const cols = renderActionButton && !swipeable ? 'render-button' : headerInfo.length;
  const isModalMode = 'renderModal' in rest;

  const render = (item: T, index: number) => {
    const isLast = index === data.length - 1;
    return (
      <div key={item['id'] ?? index} ref={isLast ? lastContentRef : undefined}>
        <List.Row>
          <Grid cols={isCol(cols) ? cols : 6}>
            {Object.keys(item).map((key, i) => {
              if (nonRenderableKey.includes(key)) return null;
              return <Grid.Column key={i}>{(item as any)[key]}</Grid.Column>;
            })}
            {renderActionButton ? <Grid.Column>{renderActionButton(item)}</Grid.Column> : null}
          </Grid>
        </List.Row>
      </div>
    );
  };

  const swipeableRender = (item: T, index: number) => {
    const isLast = index === data.length - 1;
    return (
      <div
        className="border-solid border-gray-300 border-b-[1px] last:border-b-0"
        key={item['id'] ?? index}
        ref={isLast ? lastContentRef : undefined}
      >
        <SwipeToDelete onSwipeAction={() => onSwipeAction && onSwipeAction(item)}>
          <List.Row>
            <Grid cols={isCol(cols) ? cols : 6}>
              {Object.keys(item).map((key, i) => {
                if (nonRenderableKey.includes(key)) return null;
                return <Grid.Column key={i}>{(item as any)[key]}</Grid.Column>;
              })}
            </Grid>
          </List.Row>
        </SwipeToDelete>
      </div>
    );
  };

  const modalableRender = (item: T, index: number) => {
    const isLast = index === data.length - 1;
    return (
      <div
        key={item['id'] ?? index}
        data-item={JSON.stringify(item)}
        className="border-solid border-gray-300 border-b-[1px] last:border-b-0 first:rounded-b-0"
        ref={isLast ? lastContentRef : undefined}
      >
        <List.Row>
          <Grid cols={isCol(cols) ? cols : 6}>
            {Object.keys(item).map((key, i) => {
              if (nonRenderableKey.includes(key)) return null;
              return <Grid.Column key={i}>{(item as any)[key]}</Grid.Column>;
            })}
            {renderActionButton ? <Grid.Column>{renderActionButton(item)}</Grid.Column> : null}
          </Grid>
        </List.Row>
      </div>
    );
  };
  const tableContent = (
    <div className="flex flex-col gap-2.5 w-full" data-testid="table-data">
      <TableHeader headerInfo={headerInfo} cols={isCol(cols) ? cols : 6} />
      <List
        data={data}
        render={isModalMode ? modalableRender : swipeable ? swipeableRender : render}
        emptyDataRender={emptyDataRender}
      />
    </div>
  );

  if (isModalMode) {
    return (
      <TableWithModal
        modalKey={(rest as ModalableTableProps<T>).modalKey}
        onClick={(rest as ModalableTableProps<T>).onClick}
        renderModal={(rest as ModalableTableProps<T>).renderModal}
      >
        {tableContent}
      </TableWithModal>
    );
  }

  return tableContent;
}
