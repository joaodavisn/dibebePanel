import Image from "next/image";
import { useState } from "react";
import mamarooImage from "@/sources/media/images/mamaroo.png"
import pingImage from "@/sources/media/images/ping.png"
import Vr from "../Vr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCubes, faDollarSign, faPlus, faStickyNote, faUpload } from "@fortawesome/free-solid-svg-icons";
import RentingItem from "../RentingItem";
import RentingProduct from "../RentingProduct";
import CornerButton from "../CornerButton";
import Modal from "../Modal";
export default function Products() {

  const [itemModel, setItemModel] = useState("");
  const [tab, setTab] = useState("alugueis");
  const [showRentItem, setShowRentItem] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start  items-center bg-transparent">

      <div className="w-full h-fit flex flex-row gap-2 justify-start items-center">
        <button
          onClick={() => setTab("produtos")}
          className={`w-fit py-2 px-5 
          ${tab === "produtos" ? "bg-[#FAABB0] border-[#faabb0] border-solid border-t-[2px] border-l-[2px] border-r-[2px] text-[#ffffff]" :
              "bg-white border-[#e4e4e4] border-solid border-t-[2px] border-l-[2px] border-r-[2px] text-[#797979]"} hover:bg-[#f89aa0] 
          border-[#e4e4e4] hover:border-[#faabb0] hover:text-white text-[#faabb0] 
          rounded-t-lg flex flex-row items-center justify-between gap-2`}
        >
          Produtos
          <FontAwesomeIcon icon={faCubes} />
        </button>
        <button
          onClick={() => setTab("alugueis")}
          className={`w-fit py-2 px-5 
          ${tab === "alugueis" ? "bg-[#FAABB0] border-[#faabb0] border-solid border-t-[2px] border-l-[2px] border-r-[2px] text-[#ffffff]" :
              "bg-white border-[#e4e4e4] border-solid border-t-[2px] border-l-[2px] border-r-[2px] text-[#797979]"} hover:bg-[#f89aa0] 
          border-[#e4e4e4] hover:border-[#faabb0] hover:text-white text-[#faabb0] 
          rounded-t-lg flex flex-row items-center justify-between gap-2`}
        >
          Alugueis
          <FontAwesomeIcon icon={faStickyNote} />
        </button>
      </div>

      {tab === "alugueis" && <div className="w-full h-full flex flex-col gap-2 overflow-y-auto 
      overflow-x-auto justify-start p-4 items-start border-[#faabb0] border-solid 
      border-[2px] rounded-b-lg rounded-tr-lg">
        { showRentItem && <Modal modalTitle="Alugar item" closeClick={() => {setShowRentItem(!showRentItem)}}>

        </Modal>}
        <CornerButton onClick={() => {setShowRentItem(!showRentItem)}} title="Alugar item" />
        <input
          className="w-full h-10 px-3 rounded-full border-2 border-neutral-200 focus:outline-none focus:border-[#FAABB0]"
          type="text"
          placeholder="Pesquisar item"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <RentingProduct itemImage={mamarooImage} itemType={"Mamaroo"} itemStatus={"pronto"} itemModel={"Mamaroo 4 moms"} />
      </div>}

      {tab === "produtos" && <div className="w-full h-full flex flex-col gap-2 overflow-y-auto 
      overflow-x-auto justify-start p-4 items-start border-[#faabb0] border-solid 
      border-[2px] rounded-b-lg rounded-tr-lg">
        <input
          className="w-full h-10 px-3 rounded-full border-2 border-neutral-200 focus:outline-none focus:border-[#FAABB0]"
          type="text"
          placeholder="Pesquisar item"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <RentingItem itemImage={mamarooImage} itemType={"Mamaroo"} itemStatus={"pronto"} itemModel={"Mamaroo 4 moms"} />
      </div>}
    </div>
  );

}
