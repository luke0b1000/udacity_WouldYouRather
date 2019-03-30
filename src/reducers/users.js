import {
    RECEIVE_USERS,
    ADD_QUESTION_TO_USER,
    ADD_ANSWER_TO_USER,
    ADD_USER
} from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return action.users;
        case ADD_QUESTION_TO_USER:
            return {
                ...state,
                [action.user]: {
                    ...state[action.user],
                    questions: [
                        ...state[action.user].questions,
                        action.question_id
                    ]
                }
            };
        case ADD_ANSWER_TO_USER:
            return {
                ...state,
                [action.authUser]: {
                    ...state[action.authUser],
                    answers: {
                        ...state[action.authUser].answers,
                        [action.question_id]: action.answer
                    }
                }
            };
        case ADD_USER:
            return {
                ...state,
                [action.userObj.id] : action.userObj
            }
        default:
            return state;
    }
}
