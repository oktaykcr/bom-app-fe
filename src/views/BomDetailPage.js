import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import ComponentUsedCreateUpdate from "../components/componentUsed/ComponentUsedCreateUpdate";
import ComponentUsedTable from "../components/componentUsed/ComponentUsedTable";
import Loader from "react-loader-spinner";

import { FaPlus } from "react-icons/fa";

export default function BomDetailPage() {
    let { bomId } = useParams();
    const boms = useSelector((state) => state.boms);
    const [currentBom, setCurrentBom] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const componentUsedModel = {
        "id": null,
        "bom": {
            "id": ''
        },
        "component": {
            "mouserPartNumber": ''
        },
        "quantity": 1,
        "cost": 0,
        "leadTime": 0
    };

    const [isProcessing, setIsProcessing] = useState(false);
    const [componentUsed, setComponentUsed] = useState(componentUsedModel);



    const openModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        setCurrentBom(boms.find((bom) => bom.id === bomId));
    }, [boms, bomId]);

    return (
        !currentBom ? (
            <Redirect to="/bom" />
        ) : (
            <>
                <div className="header">{currentBom.title}</div>
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
                    <ComponentUsedCreateUpdate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bomId={bomId} componentUsed={componentUsed} setComponentUsed={setComponentUsed} componentUsedModel={componentUsedModel} setIsProcessing={setIsProcessing} />
                </div>
                <ComponentUsedTable setIsModalOpen={setIsModalOpen} bomId={bomId} setComponentUsed={setComponentUsed} isProcessing={isProcessing} />
            </>
        )
    );
}