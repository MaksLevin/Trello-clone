import { BaseModel } from './base-model.model';

export interface List extends BaseModel {
  mainBoardId: string;
  title: string;
  userUid: string;
}
