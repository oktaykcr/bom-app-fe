import { useState } from "react";
import ComponentCreateUpdate from "../components/component/ComponentCreateUpdate";
import ComponentTable from "../components/component/ComponentTable";

import { FaPlus } from "react-icons/fa";

export default function ComponentPage() {

    const modalFor = "componentCreateUpdateModal";

    const componentModel = {
        "id": null,
        "partNumber": '',
        "supplierLink": '',
        "quantityOnHand": 0
    };

    const [component, setComponent] = useState(componentModel);

    return (
        <>
            <h1>Components</h1>
            <div className="flex mb-5 mt-5">
                <label htmlFor={modalFor} className="btn btn-primary modal-button">
                    <FaPlus />
                </label>
                <input type="checkbox" id={modalFor} className="modal-toggle" />
                <ComponentCreateUpdate htmlFor={modalFor} component={component} setComponent={setComponent} componentModel={componentModel} />
            </div>
            <ComponentTable htmlFor={modalFor} setComponent={setComponent} />
        </>
    );
}