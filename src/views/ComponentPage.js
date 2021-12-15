import { useState } from "react";
import ComponentCreateUpdate from "../components/component/ComponentCreateUpdate";
import ComponentTable from "../components/component/ComponentTable";
import Loader from "react-loader-spinner";

import { FaPlus } from "react-icons/fa";

export default function ComponentPage() {

    const componentModel = {
        "id": null,
        "mouserPartNumber": '',
        "supplierLink": '',
        "quantityOnHand": 0
    };

    const [isProcessing, setIsProcessing] = useState(false);
    const [component, setComponent] = useState(componentModel);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

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
                        <button onClick={openModal} className="btn btn-primary modal-button">
                            <FaPlus />
                        </button>
                }
                <ComponentCreateUpdate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} component={component} setComponent={setComponent} componentModel={componentModel} setIsProcessing={setIsProcessing} />
            </div>
            <ComponentTable setIsModalOpen={setIsModalOpen} setComponent={setComponent} isProcessing={isProcessing} />
        </>
    );
}