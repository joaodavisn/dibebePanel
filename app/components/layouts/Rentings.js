import Image from "next/image";
import { useState } from "react";
import mamarooImage from "@/sources/media/images/mamaroo.png"
import pingImage from "@/sources/media/images/ping.png"
import Vr from "../Vr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faDollarSign, faUpload } from "@fortawesome/free-solid-svg-icons";
import RentingItem from "../RentingItem";
export default function Rentings() {
  const [itemModel, setItemModel] = useState("");
  const itemModels = ["Mamaroos", "Cadeirinhas", "Carrinhos"];
  const [showRentModal, setShowRentModal] = useState(false);

  const handleItemModelChange = (event) => {
    setItemModel(event.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start  items-center bg-transparent">
       {showRentModal &&
        <Modal modalTitle={"Alugar item"} closeClick={() => { setShowRentModal(!showRentModal) }}>
          <p className="text-[100pt] my-2 font-normal text-neutral-600">➕</p>
          <div className="p-1 text-center">
            
          </div>
        </Modal>
      }
      <input
        className="w-full h-10 px-3 rounded-full border-2 border-neutral-200 focus:outline-none focus:border-[#FAABB0]"
        type="text"
        placeholder="Pesquisar item"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="w-full h-full flex flex-col gap-2 overflow-y-auto overflow-x-auto justify-start p-1 items-start my-4">
        <RentingItem itemImage={mamarooImage} 
        itemType={"Mamaroo"} 
        itemStatus={"pronto"} 
        itemModel={"Mamaroo 4 moms"} 
        customer={"João Davi"} 
        itemCode={"MMR_0001A"} 
        rentStart={"01/01/2021"} 
        rentEnd={"01/02/2021"} />
      </div>
    </div>
  );
}
