export class LoginReducerState {
    static assign(...params) {
        return Object.assign({}, ...params);
    }
}
export const initialState = {
    loading: false,
    step: 1,
    validationToken: null,
    errorMessage: null,
    errorCode: null,
    accessToken: null,
    phoneNumber: null,
    representativeId: null,
    tokenType: null,
    expiresIn: null,
    created: null,
};
