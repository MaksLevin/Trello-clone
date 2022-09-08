import { createAction, props } from '@ngrx/store';
import { IUser } from "@app/core/models/user";

export const Login = createAction('[User Auth] login', props<{user: IUser}>);
