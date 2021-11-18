import { useState } from "react";
import ComponentCreateUpdate from "../components/component/ComponentCreateUpdate";
import ComponentTable from "../components/component/ComponentTable";
import Loader from "react-loader-spinner";

import { FaPlus } from "react-icons/fa";

export default function ComponentPage() {

    const modalFor = "componentCreateUpdateModal";

    const componentModel = {
        "id": null,
        "partNumber": '',
        "supplierLink": '',
        "quantityOnHand": 0
    };

    const [isProcessing, setIsProcessing] = useState(false);
    const [component, setComponent] = useState(componentModel);

    return (
        <>
            <h1 className="header">Components</h1>
            <div className="flex mb-5 mt-5">
                {
                    isProcessing ?
                        <Loader
                            type="TailSpin"
                            color="#ffffff"
                            height={30}
                            width={30}
                        />
                        :
                        <label htmlFor={modalFor} className="btn btn-primary modal-button">
                            <FaPlus />
                        </label>
                }
                <input type="checkbox" id={modalFor} className="modal-toggle" />
                <ComponentCreateUpdate htmlFor={modalFor} component={component} setComponent={setComponent} componentModel={componentModel} setIsProcessing={setIsProcessing} />
            </div>
            <ComponentTable htmlFor={modalFor} setComponent={setComponent} isProcessing={isProcessing} />
        </>
    );
}