'use client';

import Responsive from '@/app/ui/responsive';
import Grid from '@/app/ui/view/molecule/grid';
import { ListRow } from '@/app/ui/view/molecule/list/list-root';

function LectureRowDesktop({ item }: { item: ListRow }) {
  return (
    <Responsive minWidth={1000}>
      <Grid cols={9}>
        <Grid.Column>{item.lectureCode}</Grid.Column>
        <Grid.Column>{item.name}</Grid.Column>
        <Grid.Column>{item.campus}</Grid.Column>
        <Grid.Column>{item.department}</Grid.Column>
        <Grid.Column>{item.professor}</Grid.Column>
        <Grid.Column>{item.credit}학점</Grid.Column>
        <Grid.Column>
          {item.day1} {item.time1}
          {item.day2 && item.time2 && (
            <>
              <br />
              {item.day2} {item.time2}
            </>
          )}
        </Grid.Column>
        <Grid.Column>{item.lectureRoom}</Grid.Column>
        {item.note && <Grid.Column>{item.note}</Grid.Column>}
      </Grid>
    </Responsive>
  );
}

export default LectureRowDesktop;
