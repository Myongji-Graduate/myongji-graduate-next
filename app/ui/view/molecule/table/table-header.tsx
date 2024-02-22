import Grid from '../grid';
import { ColType } from '../grid/grid-root';

type TableHeaderProps = {
  headerInfo: string[];
  cols: ColType;
};

export function TableHeader({ cols, headerInfo }: TableHeaderProps) {
  return (
    <div className="text-light-blue-6 leading-4 text-lg font-bold bg-light-blue-1 py-5 rounded-[100px]">
      <Grid cols={cols}>
        {headerInfo.map((info) => (
          <Grid.Column key={info}>{info}</Grid.Column>
        ))}
      </Grid>
    </div>
  );
}
