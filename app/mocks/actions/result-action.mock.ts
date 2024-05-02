import { type ResultCategoryDetailInfo } from '../../business/result/result.query';
import { mockDatabaseStore } from '../db.mock';

export interface MockResultAction {
  getResultCategoryDetailInfo: () => ResultCategoryDetailInfo;
}

export const mockResultAction: MockResultAction = {
  getResultCategoryDetailInfo: () => mockDatabaseStore.resultCategoryDetailInfo,
};
