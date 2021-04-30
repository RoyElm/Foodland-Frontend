import { AuthModel } from "../models/auth-models/auth.model";

// Auth App State:
export class AuthState {
    public user: AuthModel = null;

    // On page refresh - load saved user back to state: 
    public constructor() {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            this.user = user;
        }
    }
}

// User Action Type:
export enum AuthActionType {
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut"
}

// User Action:
export interface AuthAction {
    type: AuthActionType; // What has been done
    payload?: any; // The data itself
}

// User Action Creators: 
export function userRegisteredAction(user: AuthModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: user };
}
export function userLoggedInAction(user: AuthModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}
export function userLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}

// User Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {

        case AuthActionType.UserRegistered:
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload;
            sessionStorage.setItem("user", JSON.stringify(newState.user));
            break;

        case AuthActionType.UserLoggedOut:
            newState.user = null;
            sessionStorage.clear();
            break;
    }

    return newState;
}
