import Image from "next/image";
import Vr from "./Vr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faDollarSign, faUpload } from "@fortawesome/free-solid-svg-icons";

export default function RentingProduct({itemImage, itemType, itemCode, itemModel, itemStatus, itemStore, itemDailyPrice, itemWeeklyPrice, itemMonthlyPrice, itemQuarterlyPrice, itemProfit    }) {
    return(
        <div className="w-full h-fit bg-neutral-100 py-2 px-2 rounded-xl justify-between flex flex-row items-center gap-2">
          <Image src={itemImage} width={40} height={40} className="ring-1 rounded-lg ring-neutral-300" />
          <div className="text-sm text-center">
            <p>Item:</p>
            <p className="font-bold">{itemType}</p>
          </div>
          <Vr />
          <div className="text-sm text-center">
            <p>Status:</p>
            {
                itemStatus == "pronto" &&
                <div className="ring-[1px] ring-green-500 bg-green-50 rounded-full px-2">
              <p className="text-green-900 font-bold text-center">Pronto</p>
            </div>
            }
            {
                itemStatus == "alugado" &&
                <div className="ring-[1px] ring-yellow-500 bg-yellow-50 rounded-full px-2">
                <p className="text-yellow-900 font-bold text-center">Alugado</p>
                </div>
            }
            {
                itemStatus == "manutencao" &&
                <div className="ring-[1px] ring-red-500 bg-red-50 rounded-full px-2">
                <p className="text-red-900 font-bold text-center">Ajustes</p>
                </div>
            }
            {
                itemStatus == "perdido" &&
                <div className="ring-[1px] ring-red-500 bg-red-50 rounded-full px-2">
                <p className="text-red-900 font-bold text-center">Perdido</p>
                </div>
            }
            {
                itemStatus == "morto" &&
                <div className="ring-[1px] ring-neutral-500 bg-neutral-50 rounded-full px-2">
                <p className="text-neutral-900 font-bold text-center">PT</p>
                </div>
            }
          </div>
          <Vr/>
          <div className="text-sm text-center">
            <p>Loja:</p>
            <p className="font-bold">Nilo Peçanha</p>
          </div>
          <Vr/>
          <div className="text-sm text-center">
            <p>Código:</p>
            <p className="font-bold">MMR_0001A</p>
          </div>
          <Vr/>
          <div className="text-sm text-center">
            <p>Modelo:</p>
            <p className="font-bold">{itemModel}</p>
          </div>
          <Vr/>
          <div className="text-sm text-center">
            <p>Semanal:</p>
            <p className="font-bold">R$ -----</p>
          </div>
          <Vr/>
          <div className="text-sm text-center">
            <p>Mensal:</p>
            <p className="font-bold">R$ 200,00</p>
          </div>
          <Vr/>
          <div className="text-sm text-center">
            <p>Trimestral:</p>
            <p className="font-bold">R$ 200,00</p>
          </div>
          <Vr/>
            <div className="flex flex-row gap-2 items-center">
              {/* <button className="w-fit h-fit bg-green-500 hover:bg-green-700 text-green-50 py-1 px-2 rounded-md font-normal gap-2 flex flex-row items-center text-sm">
                <FontAwesomeIcon icon={faDollarSign} />Alugar
              </button> */}
              <button className="w-fit h-fit bg-blue-500 hover:bg-blue-700 text-green-50 py-1 px-2 rounded-md font-normal gap-2 flex flex-row items-center text-sm">
                <FontAwesomeIcon icon={faCog} />Editar
              </button>
              <button className="w-fit h-fit bg-green-500 hover:bg-green-700 text-green-50 py-1 px-2 rounded-md font-normal gap-2 flex flex-row items-center text-sm mr-1">
                <FontAwesomeIcon icon={faDollarSign} />Alugar
              </button>
            </div>
        </div>
    )
}