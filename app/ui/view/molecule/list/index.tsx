import { Children, ReactNode, isValidElement } from 'react';
import { ListHeader } from './list-header';
import { ListRow } from './list-row';

type ListProps = {
  children: ReactNode;
};

const getChildren = (children: ReactNode, type: typeof ListHeader | typeof ListRow) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === type);
};

export default function List({ children }: ListProps) {
  return (
    <div className="flex flex-col gap-2.5 w-[900px]">
      {getChildren(children, ListHeader)}
      <div className="rounded-2xl border-[1px] border-[#0000004d] ">{getChildren(children, ListRow)}</div>
    </div>
  );
}

List.Header = ListHeader;
List.Row = ListRow;
