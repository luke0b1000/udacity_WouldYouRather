export const ADD_COMMENTS = "ADD_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export function addComment(commentObj) {
    return {
        type: ADD_COMMENTS,
        commentObj
    };
}

export function receiveCommentData(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    };
}
