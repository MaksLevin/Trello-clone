import { IMainBoard } from './mainBoard';
import { IModel } from './model';

export interface IUser extends IModel {
  username: string;
  email: string | null;
  profilePhoto?: string;
  mainBoards?: IMainBoard;
}
