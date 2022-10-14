import { IModel } from './model';

export interface IMainBoard extends IModel {
  userUid: string;
  title: string;
  description?: string;
}
