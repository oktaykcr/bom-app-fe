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
                toast.error("Components could not fetch!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    };
}

export const getAllComponents = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}/component/all`)
                .then((components) => {
                    dispatch({
                        type: "GET_COMPONENTS",
                        components
                    });
                    resolve(components.data);
                })
                .catch((error) => {
                    toast.error("Components could not fetch!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
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
                    toast.error("Component could not create!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
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
                    toast.error("Component could not update!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
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
                toast.error("Component could not delete!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }
}