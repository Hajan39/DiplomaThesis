/**
 * Token used to authorize user on backend
 * Every (authorized) request must contain this token as a bearer
 */
// tslint:disable-next-line:no-var-keyword
var token;
/**
 * Sets the token value.
 * Called by the LoginReducer on login success
 */
export const setToken = (t) => {
    console.log("Setting access token value.");
    token = t;
};
/**
 * Resets the token's value. Called by anything from anywhere.
 */
export const resetToken = () => {
    console.log("Reset access token.");
    token = undefined;
};
/**
 * Creates a fetch request and adds the authorization header to it.
 * @param input RequestInfo object
 * @param init RequestInit object
 */
export const fetchAuthorizedRequest = (input, init) => {
    if (!token) {
        throw new Error("There is no access token set yet. You would be unauthorized, the request was not sent.");
    }
    if (!init) {
        init = {
            headers: {
                Authorization: `bearer ${token}`,
            },
        };
    }
    else {
        if (!init.headers) {
            init.headers = new Headers({
                Authorization: `bearer ${token}`,
            });
        }
        else {
            init.headers = new Headers({
                Authorization: `bearer ${token}`,
            });
        }
    }
    return fetch(input, init);
};
