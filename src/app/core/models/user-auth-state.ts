import { IUser } from '@app/core/models/user';

export interface IUserAuthState {
  user: IUser;
  error: string;
}
