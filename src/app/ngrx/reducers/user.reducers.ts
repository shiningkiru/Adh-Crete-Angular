import * as UserActions from '../actions/user.actions';
import { User } from 'app/shared/Models/user';

const initailsUserState = {
    user: new User("", "No", "User")
};

export function userReducer(state = initailsUserState, action: UserActions.UpdateUser) {
    switch(action.type) {
        case UserActions.UPDATE_USER:
            return {
                ...state,
                user: {...state.user, ...action.payload}
            };
        default:            
            return state;
            
    };
    return state;
}