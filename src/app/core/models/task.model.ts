import { BaseModel } from './base-model.model';

export interface Task extends BaseModel {
  listId: string;
  title: string;
}
