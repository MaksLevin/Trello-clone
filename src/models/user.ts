import { IModel } from './model';

export interface IUser extends IModel {
  username: string;
  email: string;
  profilePhoto?: string;
}
