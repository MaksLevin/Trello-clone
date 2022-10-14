import { baseModel } from './baseModel.model';

export interface User extends baseModel {
  username: string;
  email: string | null;
  profilePhoto?: string;
}
