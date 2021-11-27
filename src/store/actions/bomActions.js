import axios from "axios";
import { toast } from "react-toastify";

import { url } from "../../api";

export const getBoms = (pageNumber, pageOffset) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}/bom`, {
                    params: {
                        pageNumber: pageNumber,
                        pageOffset: pageOffset
                    }
                })
                .then((boms) => {
                    dispatch({
                        type: "GET_BOMS",
                        boms
                    });
                    resolve(boms.data);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error.response?.data, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                });
        });
    };
}

export const getBomsByTitle = (title) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}/bom/search`, {
                    params: {
                        title: title
                    }
                })
                .then((boms) => {
                    dispatch({
                        type: "GET_BOMS",
                        boms
                    });
                    resolve(boms.data);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("BOMs could not fetch!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    resolve();
                });
        });
    };
}

export const createBom = (bom) => {
    return (dispatch) => {
        axios.post(`${url}/bom`, bom)
            .then((createdBom) => {
                dispatch({
                    type: "CREATE_BOM",
                    createdBom
                });
                toast.success("Created successfully.", {
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

export const updateBom = (bom) => {
    return (dispatch) => {
        axios.put(`${url}/bom`, bom)
            .then((updatedBom) => {
                dispatch({
                    type: "UPDATE_BOM",
                    updatedBom
                });
                toast.success("Updated successfully.", {
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

export const deleteBomById = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/bom/${id}`)
            .then((result) => {
                dispatch({
                    type: "DELETE_BOM",
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