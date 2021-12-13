import axios from "axios";
import { toast } from "react-toastify";

export const login = (username, password) => {
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`/user/login`, params, { headers: headers })
                .then(response => {
                    let responseHeaders = response["headers"];
                    let token = responseHeaders["authorization"];

                    localStorage.setItem("token", token);

                    dispatch({
                        type: "SIGN_IN",
                        token
                    });

                    resolve();
                })
                .catch(err => {
                    toast.error("Login Failed!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                });
        });
    }
}

export const register = (username, password, email) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const body = {
                username: username,
                password: password,
                email: email
            }
            console.log(body);

            axios.post(`/user/register`, body)
                .then(response => {
                    dispatch({
                        type: "SIGN_UP"
                    });
                    toast.success("Registered successfully.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                })
                .catch(err => {
                    toast.error("Register Failed!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                });
        });
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT"
        })
    }
}

export const loadUser = () => {
    let headers = {
        'Content-Type': 'application/form-data'
    };

    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (token) {
                let bodyFormData = new FormData();
                let tokenWithoutBearer = token.substring(7, token.length);
                bodyFormData.append('token', tokenWithoutBearer);

                axios.post(`/user/validate`, bodyFormData, { headers: headers })
                    .then(response => {
                        if (response.data) {
                            dispatch({
                                type: "USER_LOADED",
                                token
                            });
                            resolve();
                        }
                    })
                    .catch(err => {
                        dispatch({
                            type: "LOGOUT"
                        });
                        resolve();
                    });
            } else return null;
        });
    };
};