import {
    RECEIEVE_QUESTIONS,
    ADD_QUESTION,
    ADD_VOTES_TO_QUESTION,
    ADD_COMMENT_TO_QUESTION
} from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIEVE_QUESTIONS:
            return action.questions;
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            };
        case ADD_VOTES_TO_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: [
                            ...state[action.qid][action.answer].votes,
                            action.authUser
                        ]
                    }
                }
            };
        case ADD_COMMENT_TO_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    comments: [...state[action.qid].comments, action.id]
                }
            };
        default:
            return state;
    }
}
