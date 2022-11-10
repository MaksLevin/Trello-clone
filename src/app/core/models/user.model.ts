import { BaseModel } from './base-model.model';

export interface User extends BaseModel {
  username: string;
  email: string | null;
  profilePhoto?: string;
}
