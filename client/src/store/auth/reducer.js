import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actiontype";

const init = {
    loading: false,
    error: false,
    token:""
}

export const reducer = (state = init, {type, payload}) => {
    switch (type) {
        case LOGIN_LOADING :
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            console.log(payload);
            return {
                ...state,
                loading: false,
                error: false,
                token: payload.token,
                username: payload.user.username,
                email: payload.user.email
            }
        case LOGIN_ERROR :
            return {
                ...state,
                loading: false,
                error: true
            }
        case LOGOUT_SUCCESS :
            return init
    
        default:
            return state
    }
}