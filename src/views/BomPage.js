import { useState } from "react"
import BomCreateUpdate from "../components/bom/BomCreateUpdate";
import BomList from "../components/bom/BomList";

import { FaPlus } from "react-icons/fa";

export default function BomPage() {

    const modalFor = "bomSaveUpdateModal";

    const bomModel = {
        "id": null,
        "title": '',
        "descripiton": ''
    };

    const [bom, setBom] = useState(bomModel)

    return (
        <>
            <h1 className="header">BOM</h1>
            <div className="flex mb-5 mt-5">
                <label htmlFor={modalFor} className="btn btn-primary modal-button">
                    <FaPlus />
                </label>
                <input type="checkbox" id={modalFor} className="modal-toggle" />
                <BomCreateUpdate htmlFor={modalFor} bom={bom} setBom={setBom} bomModel={bomModel} />
            </div>
            <BomList htmlFor={modalFor} setBom={setBom} />
        </>
    );
}