import { baseModel } from './baseModel.model';

export interface List extends baseModel {
  mainBoardId: string;
  title: string;
}
