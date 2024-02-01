import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Vr from "./Vr";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Confirmation from "./Confirmation";

export default function CampaignItem({ campaignName, campaignDescription, campaignUrl, camapignDestination, campaignUses, onDetails }) {
    const [showCopy, setShowCopy] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setShowCopy(true);
        });
    }

    useEffect(() => {
        if (showCopy) {
            const timer = setTimeout(() => {
                setShowCopy(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showCopy]);

    return (
        <div className="w-full h-fit bg-neutral-100 py-2 px-4 rounded-xl justify-between flex flex-row items-center gap-2">
            {showCopy &&
                <Confirmation message={"Link copiado!"}/>
            }
            <div className="flex flex-col items-center w-full justify-center text-center">
                <p className="text-sm font-normal">Campanha:</p>
                <h1 className="text-sm font-bold">{campaignName}</h1>
            </div>
            <Vr />
            <div className="flex flex-col items-center w-full justify-center text-center">
                <p className="text-sm font-normal">Descrição:</p>
                <p className="text-sm font-bold">{campaignDescription}</p>
            </div>
            <Vr />
            <div className="flex flex-col items-center w-full justify-center text-center">
                <p className="text-sm font-normal">Link:</p>
                <button className="flex flex-row bg-blue-600 py-1 px-4 rounded-full" onClick={() => copyToClipboard(campaignUrl)}>
                    <p className="text-sm font-bold text-ellipsis whitespace-nowrap overflow-hidden max-w-44 text-white">{campaignUrl}</p>
                </button>
            </div>
            <Vr />
            <div className="flex flex-col items-center w-full justify-center text-center">
                <p className="text-sm font-normal">Destino:</p>
                <button className="flex flex-row bg-neutral-200 py-1 px-4 rounded-full" onClick={() => copyToClipboard(camapignDestination)}>
                    <p className="text-sm font-bold text-ellipsis whitespace-nowrap overflow-hidden max-w-44 text-neutral-800">{camapignDestination}</p>
                </button>
            </div>
            <Vr />
            <div className="flex flex-col items-center w-full justify-center text-center">
                <p className="text-sm font-normal">Cliques:</p>
                <p className="text-sm font-bold">{campaignUses}</p>
            </div>
            <Vr />
            <button className="w-fit h-fit bg-blue-500 hover:bg-blue-700 text-green-50 py-1 px-2 rounded-md font-normal gap-2 flex flex-row items-center text-sm" onClick={onDetails}>
                <FontAwesomeIcon icon={faEye} />Detalhes
            </button>
        </div>
    )
}