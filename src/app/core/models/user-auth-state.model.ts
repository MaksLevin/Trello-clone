import { User } from '@src/app/core/models/user.model';

export interface UserAuthState {
  user: User;
  error: string;
}
