import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Customers() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <button className="absolute bottom-12 right-8 w-fit text-sm bg-[#ffffff] hover:bg-[#FAABB0] hover:text-[#ffffff] text-[#FAABB0] font-bold py-2 px-4 rounded-full ring-2 ring-[#FAABB0] gap-2 flex flex-row items-center">
        Novo cliente<FontAwesomeIcon icon={faPlus} />
      </button>
      <h1>Clientes</h1>
    </div>
  )
}