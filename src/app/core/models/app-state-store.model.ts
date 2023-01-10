import { UserAuthState } from './user-auth-state.model';

export interface AppStateStore {
  userAuth: UserAuthState;
}
