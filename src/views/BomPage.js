import { useState } from "react"

import BomCreateUpdate from "../components/bom/BomCreateUpdate";
import BomList from "../components/bom/BomList";

import { FaPlus } from "react-icons/fa";

export default function BomPage() {

    const bomModel = {
        "id": null,
        "title": '',
        "description": ''
    };

    const [bom, setBom] = useState(bomModel);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <h1 className="header">BOM</h1>
            <div className="flex mb-5 mt-5">
                <button onClick={openModal} className="btn btn-primary modal-button">
                    <FaPlus />
                </button>
                <BomCreateUpdate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bom={bom} setBom={setBom} bomModel={bomModel} />
            </div>
            <BomList itemsPerPage={10} setIsModalOpen={setIsModalOpen} setBom={setBom} />
        </>
    );
}