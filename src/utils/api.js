import {
    _getUsers,
    _getQuestions,
    _getComments,
    _saveQuestion,
    _saveQuestionAnswer,
    _saveUser,
    _saveComment
} from "./_DATA";

export function getInitialData() {
    return Promise.all([_getUsers(), _getQuestions(), _getComments()])
        .then(([users, questions, comments]) => ({
            users,
            questions,
            comments
        }))
        .catch(err => console.log("Error in getIntialData", err));
}

export function saveQuestion(question) {
    return _saveQuestion(question);
}

export function saveAnswer(question) {
    return _saveQuestionAnswer(question);
}

export function saveUser(user) {
    return _saveUser(user);
}

export function saveComment(comment) {
    return _saveComment(comment);
}
