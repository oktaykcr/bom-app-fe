import axios from "axios";
import { toast } from "react-toastify";

import { url } from "../../api";

export const getComponentsUsed = (bomId, pageNumber, pageOffset) => {
    return (dispatch) => {
        axios
            .get(`${url}/componentused/bybom`, {
                params: {
                    bomId: bomId,
                    pageNumber: pageNumber,
                    pageOffset: pageOffset
                }
            })
            .then((componentsUsed) => {
                dispatch({
                    type: "GET_COMPONENTS_USED",
                    componentsUsed
                });
            })
            .catch((error) => {
                toast.error("Component to use could not fetch!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    };
}

export const getAllComponentsUsed = (bomId) => {
    return (dispatch) => {
        axios
            .get(`${url}/componentused/all`, {
                params: {
                    bomId: bomId
                }
            })
            .then((componentsUsed) => {
                dispatch({
                    type: "GET_COMPONENTS_USED",
                    componentsUsed
                });
            })
            .catch((error) => {
                toast.error("Component to use could not fetch!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    };
}

export const createComponentUsed = (componentUsed) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${url}/componentused`, componentUsed)
                .then((createdComponentUsed) => {
                    dispatch({
                        type: "CREATE_COMPONENT_USED",
                        createdComponentUsed
                    });
                    toast.success("Created successfully.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                })
                .catch((error) => {
                    toast.error("Component to use could not create!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                });
        });
    }
}

export const updateComponentUsed = (component) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.put(`${url}/componentused`, component)
                .then((updatedComponentUsed) => {
                    dispatch({
                        type: "UPDATE_COMPONENT_USED",
                        updatedComponentUsed
                    });
                    toast.success("Updated successfully.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                })
                .catch((error) => {
                    toast.error("Component to use could not update!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                });
        });
    }
}

export const deleteComponentUsedById = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/componentused/${id}`)
            .then((result) => {
                dispatch({
                    type: "DELETE_COMPONENT_USED",
                    id
                });
                toast.success("Deleted successfully.", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            })
            .catch((error) => {
                toast.error("Component to use could not delete!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }
}