const componentReducer = (components = [], action) => {
    switch (action.type) {
        case "GET_COMPONENTS":
            return action.components.data.data;
        case "CREATE_COMPONENT":
            return [action.createdComponent.data.data, ...components];
        case "UPDATE_COMPONENT":
            return components.map((component) =>
                component.id === action.updatedComponent.data.data.id ? action.updatedComponent.data.data : component
            );
        case "DELETE_COMPONENT":
            return components.filter((component) => component.id !== action.id);
        default:
            return components;
    }
}

export default componentReducer;