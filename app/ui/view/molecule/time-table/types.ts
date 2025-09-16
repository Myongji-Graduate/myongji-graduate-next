import type { ListRow } from '../list/list-root';

export interface TimetableItem {
  id: number;
  day: string;
  col: number;
  start: number;
  end: number;
  topPct: number;
  heightPct: number;
  name: string;
  lectureCode: string;
  nonRenderableKey?: string[];
  isEditable?: boolean;
}

export interface TimeTableProps<T extends ListRow> {
  data: T[];
  isEditable?: boolean;
  onRemove?: (lectureId: number) => void;
}

export interface TimeSlot {
  h: number;
  m: number;
}

export interface TimeRange {
  start: number;
  end: number;
}
