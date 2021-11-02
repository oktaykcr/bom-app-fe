import { setAuthorizationToken } from "../../api";
import jwtDecode from "jwt-decode";

const initState = {
    id: null,
    username: null,
    email: null,
    token: localStorage.getItem("token"),
    isUserLoaded: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "SIGN_IN":
        case "USER_LOADED":
            const token = action.token;
            const user = jwtDecode(token);
            setAuthorizationToken(token);
            return {
                ...initState,
                id: user.id,
                username: user.username,
                email: user.email,
                token: token,
                isUserLoaded: true
            };
        case "SIGN_UP":
        case "LOGOUT":
            localStorage.removeItem("token");
            setAuthorizationToken(false);
            return {
                ...initState,
                isUserLoaded: true
            };
        default:
            return state;
    }
}

export default authReducer;