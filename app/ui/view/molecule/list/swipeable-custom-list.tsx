import React, { ReactNode } from 'react';
import { ListRow } from './list-root';
// import { SwipeableList, Type as ListType } from 'react-swipeable-list';

interface SwipeableListProps<T extends ListRow> {
  data: T[];
  render: (item: T, index: number) => ReactNode;
}

export default function SwipeableCustomList<T extends ListRow>({ data, render }: SwipeableListProps<T>) {
  return (
    <div className="rounded-xl border-[1px] border-gray-300 w-full ">
      {/* <SwipeableList type={ListType.IOS}>{data.map((item, index) => render(item, index))}</SwipeableList> */}
    </div>
  );
}
