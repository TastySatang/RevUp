const SET_ERRORS = 'errors/SET_ERRORS';

export const setErrors = (errors) => {
    return {
        type: SET_ERRORS,
        payload: errors,
    };
};

const initialstate = []

export default function reducer(_state, action) {
    switch (action.type) {
        case SET_ERRORS:
            return action.payload;
        default:
            return initialstate;
    }
}
