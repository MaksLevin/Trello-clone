import { baseModel } from './baseModel.model';

export interface MainBoard extends baseModel {
  userUid: string;
  title: string;
  description?: string;
}
