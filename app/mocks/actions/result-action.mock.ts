import { type ResultCategoryDetailInfo } from '../../business/result/result.query';
import { mockDatabaseStore } from '../data';

export interface MockResultAction {
  getResultCategoryDetailInfo: () => ResultCategoryDetailInfo;
}

export const mockResultAction: MockResultAction = {
  getResultCategoryDetailInfo: () => mockDatabaseStore.resultCategoryDetailInfo,
};
