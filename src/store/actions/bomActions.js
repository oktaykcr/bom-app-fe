import axios from "axios";
import { toast } from "react-toastify";

export const getBoms = (pageNumber, pageOffset) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`/bom`, {
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
                    toast.error("BOMs could not fetch!", {
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
                .get(`/bom/search`, {
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
        axios.post(`/bom`, bom)
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
                toast.error("BOM could not create!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }
}

export const updateBom = (bom) => {
    return (dispatch) => {
        axios.put(`/bom`, bom)
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
                toast.error("BOM could not update!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }
}

export const deleteBomById = (id) => {
    return (dispatch) => {
        axios.delete(`/bom/${id}`)
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
                toast.error("BOM could not delete!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }
}