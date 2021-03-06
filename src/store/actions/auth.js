import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        // type: actionTypes.AUTH_LOGOUT
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkoutTimeout = (expirationTime) => {
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // };
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBKqNv_boIPfhm-XeRmpKO66_47fCvM2B4';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBKqNv_boIPfhm-XeRmpKO66_47fCvM2B4';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            localStorage.setItem('token', response.data.idToken);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkoutTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response);
            dispatch(authFail(err.response.data.error));
        })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout(token));
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkoutTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}