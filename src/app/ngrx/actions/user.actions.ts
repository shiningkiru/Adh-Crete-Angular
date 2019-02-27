import { Action } from '@ngrx/store';
import { User } from 'app/shared/Models/user';

export const UPDATE_USER = "update-user";

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;

    constructor(public payload: User){}
}

export type UserActions = UpdateUser;