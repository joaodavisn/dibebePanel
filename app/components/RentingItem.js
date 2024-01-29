import Image from "next/image";
import Vr from "./Vr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faDollarSign, faUpload } from "@fortawesome/free-solid-svg-icons";

export default function RentingItem({itemImage, itemType, itemCode, itemModel, customer, rentStart, rentEnd}) {
    return(
        <div className="w-full h-fit bg-neutral-100 py-2 px-2 rounded-xl justify-between flex flex-row items-center gap-2">
          <Image alt="Item Image" src={itemImage} width={40} height={40} className="ring-1 rounded-lg ring-neutral-300" />
          <div className="text-sm flex flex-col items-center justify-center w-1/6">
            <p>Item:</p>
            <p className="font-bold">{itemType}</p>
          </div>
          <Vr />
          <div className="text-sm flex flex-col items-center justify-center w-1/6">
            <p>Modelo:</p>
            <p className="font-bold">{itemModel}</p>
          </div>
          
          <Vr/>
          <div className="text-sm flex flex-col items-center justify-center w-1/6">
            <p>Cliente:</p>
            <p className="font-bold text-center">{customer}</p>
          </div>
          <Vr/>
          <div className="text-sm flex flex-col items-center justify-center w-1/6">
            <p>Código:</p>
            <p className="font-bold">{itemCode}</p>
          </div>
          <Vr/>
          <div className="text-sm flex flex-col items-center justify-center w-1/6">
            <p>Início:</p>
            <p className="font-bold">{rentStart}</p>
          </div>
          <Vr/>
          <div className="text-sm flex flex-col items-center justify-center w-1/6">
            <p>Fim:</p>
            <p className="font-bold">{rentEnd}</p>
          </div>
          <Vr/>
            <div className="flex flex-row gap-2 items-center">
              {/* <button className="w-fit h-fit bg-green-500 hover:bg-green-700 text-green-50 py-1 px-2 rounded-md font-normal gap-2 flex flex-row items-center text-sm">
                <FontAwesomeIcon icon={faDollarSign} />Alugar
              </button> */}
              <button className="w-fit h-fit bg-blue-500 hover:bg-blue-700 text-green-50 py-1 px-2 rounded-md font-normal gap-2 flex flex-row items-center text-sm">
                <FontAwesomeIcon icon={faCog} />Editar
              </button>
              <button className="w-fit h-fit bg-yellow-500 hover:bg-yellow-700 text-green-50 py-1 px-2 rounded-md font-normal gap-2 flex flex-row items-center text-sm mr-1">
                <FontAwesomeIcon icon={faUpload} />Atualizar
              </button>
            </div>
        </div>
    )
}