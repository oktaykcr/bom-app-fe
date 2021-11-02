import { useState } from "react"
import BomCreateUpdate from "../components/bom/BomCreateUpdate";
import BomList from "../components/bom/BomList";

import { FaPlus } from "react-icons/fa";

export default function BomPage() {

    const [bom, setBom] = useState({
        "id": null,
        "title": '',
        "descripiton": ''
    })

    return (
        <>
            <h1>BOM Page</h1>
            <div className="flex justify-end mb-5 mt-5">
                <label htmlFor="bomSaveUpdateModal" className="btn btn-primary modal-button">
                    <FaPlus />
                </label>
                <input type="checkbox" id="bomSaveUpdateModal" className="modal-toggle" />
                <BomCreateUpdate bom={bom} setBom={setBom} />
            </div>
            <BomList setBom={setBom} />
        </>
    );
}