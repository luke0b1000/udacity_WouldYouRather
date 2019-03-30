export const RECEIEVE_QUESTIONS = "RECEIEVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_VOTES_TO_QUESTION = "ADD_VOTES_TO_QUESTION";
export const ADD_COMMENT_TO_QUESTION = "ADD_COMMENT_TO_QUESTION";

export function receieveQuestionsData(questions) {
    return {
        type: RECEIEVE_QUESTIONS,
        questions
    };
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    };
}

export function addVotesToQuestion({ qid, answer, authUser }) {
    return {
        type: ADD_VOTES_TO_QUESTION,
        qid,
        answer,
        authUser
    };
}

export function addCIdToQ({ qid, id }) {
    return {
        type: ADD_COMMENT_TO_QUESTION,
        qid,
        id
    };
}
