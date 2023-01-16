export const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null};
        case "AUTH_IS_READY":
            return {...state, user: action.payload, authIsReady: true}
        case "SUBMISSION_SELECTED":
            return {...state, selectedSubmission: action.payload}
        default :
            return state;
    }
}