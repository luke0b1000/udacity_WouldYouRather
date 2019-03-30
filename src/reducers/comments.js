import { ADD_COMMENTS, RECEIVE_COMMENTS } from "../actions/comments";

export default function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS: 
            return  {
                ...action.comments
            }
        case ADD_COMMENTS:
            return {
                ...state,
                [action.commentObj.id]: {
                    ...action.commentObj
                }
            };
        default:
            return state;
    }
}
