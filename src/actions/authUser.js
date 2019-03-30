export const SET_AUTH_USER = 'SET_AUTH_USER';

function setAuthUser(userName) {
    return {
        type: SET_AUTH_USER,
        userName
    }
}


export function handleSetAuthUser(userName) {
    return dispatch => {
        dispatch(setAuthUser(userName))
    }
}