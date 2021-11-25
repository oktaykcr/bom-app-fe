const componentUsedReducer = (componentsUsed = [], action) => {
    switch (action.type) {
        case "GET_COMPONENTS_USED":
            return action.componentsUsed.data.data;
        case "CREATE_COMPONENT_USED":
            return [action.createdComponentUsed.data.data, ...componentsUsed];
        case "UPDATE_COMPONENT_USED":
            return componentsUsed.map((componentUsed) =>
                componentUsed.id === action.updatedComponentUsed.data.data.id ? action.updatedComponentUsed.data.data : componentUsed
            );
        case "DELETE_COMPONENT_USED":
            return componentsUsed.filter((componentUsed) => componentUsed.id !== action.id);
        default:
            return componentsUsed;
    }
}

export default componentUsedReducer;