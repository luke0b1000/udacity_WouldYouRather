import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveUser } from "../utils/api";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";
export const ADD_USER = "ADD_USER";

export function receiveDataUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    };
}

export function addQToUser({ id, author }) {
    return {
        type: ADD_QUESTION_TO_USER,
        question_id: id,
        user: author
    };
}

export function addAnswerToUser({ authedUser, qid, answer }) {
    return {
        type: ADD_ANSWER_TO_USER,
        authUser: authedUser,
        question_id: qid,
        answer
    };
}

export function addUser(userObj) {
    return {
        type: ADD_USER,
        userObj
    };
}

export function handleAddUser(userObj) {
    return dispatch => {
        dispatch(showLoading());
        return saveUser(userObj)
            .then(() => {
                dispatch(addUser(userObj));
                dispatch(hideLoading());
            })
            .catch(err => console.log("Error in handleAddUser", err));
    };
}
