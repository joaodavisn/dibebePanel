import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Draggable from "react-draggable";

export default function DeliveryInfo({ code, item, deliveryDate, deliveryTime, deliveryAddress, customer, contact, observations, status, cancelReason, onCancel, onRoute, onDelivered, onArchive, onRetry}) {
    return (
        <div className="w-[90%] h-fit flex flex-col justify-center items-center bg-gray-50 ring-[1px] ring-gray-200 rounded-lg">
            <div className="relative top-0 h-6 w-full bg-gray-400 rounded-t-lg flex flex-col justify-center gap-1 items-center">
                <div className="h-[2px] rounded-full w-12 bg-gray-100"></div>
                <div className="h-[2px] rounded-full w-12 bg-gray-100"></div>
                <div className="h-[2px] rounded-full w-12 bg-gray-100"></div>
            </div>
            <div className="flex w-full flex-col justify-start items-start gap-1 px-2 py-2">
                <p>Código da entrega:</p>
                <p className="text-left font-bold">{code}</p>
            <div className="w-full h-[1px] bg-gray-200"></div>
                <p>Item:</p>
                <p className="text-left font-bold">{item}</p>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <p>Agendamento:</p>
                <div className="flex flex-row justify-between items-center gap-1">
                    <p className="font-bold">{deliveryDate}</p>
                    <p>às</p>
                    <p className="font-bold">{deliveryTime}</p>
                </div>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <p>Endereço:</p>
                <p className="text-left font-bold">{deliveryAddress}</p>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <p>Cliente:</p>
                <p className="text-left font-bold">{customer}</p>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <p>Contato:</p>
                <p className="text-left font-bold">{contact}</p>
                <div className="w-full h-[1px] bg-gray-200"></div>
                <p>Observações:</p>
                <p className="text-left font-bold">{observations}</p>
                {status==="cancelled" && <div className="w-full">
                    <div className="w-full h-[1px] bg-gray-200"></div>
                    <p>Motivo:</p>
                    <p className="text-left font-bold">{cancelReason}</p>
                </div>}
                <div className="flex flex-row justify-between items-center gap-1 w-full">
                    {status === "pending" && (
                        <>
                            <button className="w-full text-sm bg-orange-200 hover:bg-orange-300 text-orange-900 font-bold py-2 px-2 rounded-lg" onClick={onRoute}>
                                Em rota
                            </button>
                            <button className="w-full text-sm bg-green-200 hover:bg-green-300 text-green-900 font-bold py-2 px-2 rounded-lg" onClick={onDelivered}>
                                Entregue
                            </button>
                            <button className="w-full text-sm bg-red-200 hover:bg-red-300 text-red-900 font-bold py-2 px-2 rounded-lg" onClick={onCancel}>
                                Cancelar
                            </button>
                        </>
                    )}
                    {status === "route" && (
                        <>
                            <button className="w-full text-sm bg-green-200 hover:bg-green-300 text-green-900 font-bold py-2 px-2 rounded-lg" onClick={onDelivered}>
                                Entregue
                            </button>
                            <button className="w-full text-sm bg-red-200 hover:bg-red-300 text-red-900 font-bold py-2 px-2 rounded-lg" onClick={onCancel}>
                                Cancelar
                            </button>
                        </>
                    )}
                    {status === "delivered" && (
                        <button className="w-full text-sm bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-2 rounded-lg" onClick={onArchive}>
                            Arquivar
                        </button>
                    )}
                    {status === "cancelled" && (
                        <button className="w-full text-sm bg-green-200 hover:bg-green-300 text-green-900 font-bold py-2 px-2 rounded-lg" onClick={onRetry}>
                            Re tentar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}