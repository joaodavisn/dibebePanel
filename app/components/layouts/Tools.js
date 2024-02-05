import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import ToolIcon from "../ToolIcon";
import ReactInputMask from 'react-input-mask';
import Confirmation from "../Confirmation";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export default function Tools() {
    const [showGenerateWhatsAppLink, setShowGenerateWhatsAppLink] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [messageContent, setMessageContent] = useState("");
    const [generatedLink, setGeneratedLink] = useState("Link gerado");
    const [showCopy, setShowCopy] = useState(false);

    useEffect(() => {
        if (showCopy) {
            const timer = setTimeout(() => {
                setShowCopy(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showCopy]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setShowCopy(true);
        });
    }

    function generateWhatsAppLink() {
        const cleanPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
        if (cleanPhoneNumber.trim() === "" || messageContent.trim() === "") {
            console.error("Please fill in all fields");
            return;
        }
        const formattedPhoneNumber = `+55${cleanPhoneNumber}`;
        let link = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(messageContent)}`;
        setGeneratedLink(link);
    }


    return (
        <div className="w-full h-full flex flex-col justify-start items-center bg-white">
            {showGenerateWhatsAppLink &&
                <Modal modalTitle="Gerar link do WhatsApp" closeClick={() => [setShowGenerateWhatsAppLink(false), setGeneratedLink("Link gerado"), setPhoneNumber(""), setMessageContent("")]} >
                    {showCopy &&
                        <Confirmation message={"Link copiado!"} />
                    }
                    <div className="w-full h-full flex flex-col gap-4 justify-start items-start p-4">
                        <label className="w-full flex flex-col justify-start items-start">
                            <p className="text-left">Número de destino</p>
                            <ReactInputMask mask="(99) 9 9999-9999" maskChar="" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full h-12 border-2 px-4 border-solid border-neutral-200 rounded-full" placeholder="Insira o número" />
                        </label>
                        <label className="w-full flex flex-col justify-start items-start">
                            <p className="text-left">Mensagem personalizada</p>
                            <input className="w-full border-2 border-neutral-300 focus:border-[#faabb0] py-2 px-4 rounded-full" placeholder="Olá! Gostaria de saber mais! 😍" type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                        </label>
                        <button className="w-full h-12 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full my-12" onClick={generateWhatsAppLink}>Gerar link</button>
                        <label className="w-full flex flex-col justify-start items-start">
                            <p className="text-center w-full">Link para a conversa:</p>
                            <button type="text" className="w-full h-12 bg-neutral-100 ring-1 ring-neutral-300 text-neutral-900 rounded-full px-4" onClick={() => copyToClipboard(generatedLink)} ><p className="text-ellipsis truncate text-nowrap">{generatedLink}</p></button>
                        </label>
                    </div>
                </Modal>
            }
            <div className="grid grid-cols-6 grid-rows-5 gap-2 w-full h-full p-2">
                <ToolIcon icon={faWhatsapp} title="Gerar link do WhatsApp" onClick={() => setShowGenerateWhatsAppLink(true)} />
                <ToolIcon icon={faFile} title="Gerar Relatório" onClick={() => setShowGenerateWhatsAppLink(true)} />
            </div>
        </div>
    )
}