import { BaseModel } from './base-model.model';

export interface MainBoard extends BaseModel {
  userUid: string;
  title: string;
  description?: string;
}
