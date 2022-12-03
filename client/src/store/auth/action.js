    // import axios from "axios";
    import { LOGIN_LOADING, LOGIN_SUCCESS,LOGIN_ERROR, LOGOUT_SUCCESS } from "./actiontype";

    export const loginloading = () => {
    return {
        type: LOGIN_LOADING,
    };
    };

    export const sucessLogin = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload,
    };
    };

    export const loginerror = () => {
    return {
        type: LOGIN_ERROR,
    };
    };
    export const logoutsuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
    };

 
