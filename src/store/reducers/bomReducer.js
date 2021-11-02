const bomReducer = (boms = [], action) => {
    switch (action.type) {
        case "GET_BOMS":
            return action.boms.data.data;
        case "CREATE_BOM":
            return [action.createdBom.data.data, ...boms];
        case "UPDATE_BOM":
            return boms.map((bom) =>
                bom.id === action.updatedBom.data.data.id ? action.updatedBom.data.data : bom
            );
        case "DELETE_BOM":
            return boms.filter((bom) => bom.id !== action.id);
        default:
            return boms;
    }
}

export default bomReducer;