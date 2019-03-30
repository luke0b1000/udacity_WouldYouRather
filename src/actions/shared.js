import {
    getInitialData,
    saveQuestion,
    saveAnswer,
    saveComment
} from "../utils/api";
import { receiveDataUsers, addQToUser, addAnswerToUser } from "./users";
import {
    receieveQuestionsData,
    addQuestion,
    addVotesToQuestion,
    addCIdToQ
} from "./questions";
import { showLoading, hideLoading } from "./progressBar";
import { addComment, receiveCommentData } from "./comments";

export function handleInitialData() {
    return dispatch => {
        dispatch(showLoading());
        return getInitialData()
            .then(({ users, questions, comments }) => {
                dispatch(receiveDataUsers(users));
                dispatch(receieveQuestionsData(questions));
                dispatch(receiveCommentData(comments));
                dispatch(hideLoading());
            })
            .catch(err => console.log("Error in handleInitialData", err));
    };
}

export function handleNewQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        return saveQuestion({
            author: authUser,
            optionOneText: optionOne,
            optionTwoText: optionTwo
        })
            .then(questionObject => {
                dispatch(addQuestion(questionObject));
                dispatch(addQToUser(questionObject));
                dispatch(hideLoading());
            })
            .catch(err => console.log("Error in handleNewQuestion", err));
    };
}

export function handleSaveAnswer({ qid, answer }) {
    return (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        return saveAnswer({
            authedUser: authUser,
            qid,
            answer
        })
            .then(() => {
                dispatch(
                    addAnswerToUser({
                        authedUser: authUser,
                        qid,
                        answer
                    })
                );
                dispatch(
                    addVotesToQuestion({
                        qid,
                        answer,
                        authUser
                    })
                );
                dispatch(hideLoading());
            })
            .catch(err => console.log("Error in handleSaveAnswer", err));
    };
}

export function handleSaveComment({ qid, text }) {
    return (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser } = getState();
        const comment = {
            qid,
            text,
            author: authUser
        };
        return saveComment(comment)
            .then(commentObj => {
                dispatch(addComment(commentObj));
                dispatch(addCIdToQ(commentObj));
                dispatch(hideLoading());
            })
            .catch(err => console.log("Error in handleSaveComment", err));
    };
}
