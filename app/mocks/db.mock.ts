import { mockUserAction, type MockUserACtion } from './actions/user-action.mock';
import { mockLectureAction, type MockLectureAction } from './actions/lecture-action.mock';
import { mockResultAction, type MockResultAction } from './actions/result-action.mock';

type MockDatabaseAction = MockUserACtion & MockLectureAction & MockResultAction;

export const mockDatabase: MockDatabaseAction = {
  ...mockUserAction,
  ...mockLectureAction,
  ...mockResultAction,
};
