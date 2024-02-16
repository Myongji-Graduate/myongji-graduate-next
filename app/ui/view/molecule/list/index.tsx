import { Children, ReactNode, isValidElement } from 'react';
import { ListHeader } from './list-header';
import { ListRow } from './list-row';

type ListProps = {
  children: ReactNode;
};

export function List({ children }: ListProps) {
  const getChildren = (type: typeof ListHeader | typeof ListRow) => {
    const childrenArray = Children.toArray(children);
    return childrenArray.filter((child) => isValidElement(child) && child.type === type);
  };

  return (
    <div className="flex flex-col gap-2.5 w-[900px]">
      {getChildren(ListHeader)}
      <div className="rounded-2xl border-[1px] border-[#0000004d] ">{getChildren(ListRow)}</div>
    </div>
  );
}

List.Header = ListHeader;
List.Row = ListRow;
