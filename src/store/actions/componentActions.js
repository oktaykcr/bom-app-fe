import axios from "axios";
import { toast } from "react-toastify";

import { url } from "../../api";

export const getComponents = (pageNumber, pageOffset) => {
    return (dispatch) => {
        axios
            .get(`${url}/component`, {
                params: {
                    pageNumber: pageNumber,
                    pageOffset: pageOffset
                }
            })
            .then((components) => {
                dispatch({
                    type: "GET_COMPONENTS",
                    components
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    };
}

export const createComponent = (component) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/component`, component)
                .then((createdComponent) => {
                    dispatch({
                        type: "CREATE_COMPONENT",
                        createdComponent
                    });
                    toast.success("Created successfully.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error.response?.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                });
        });
    }
}

export const updateComponent = (component) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/component`, component)
                .then((updatedComponent) => {
                    dispatch({
                        type: "UPDATE_COMPONENT",
                        updatedComponent
                    });
                    toast.success("Updated successfully.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error.response?.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                });
        });
    }
}

export const deleteComponentById = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/component/${id}`)
            .then((result) => {
                dispatch({
                    type: "DELETE_COMPONENT",
                    id
                });
                toast.success("Deleted successfully.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response?.data, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }
}