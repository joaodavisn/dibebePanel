import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CornerButton({ onClick, title }) {
    return (
        <button className="w-fit text-sm bg-[#ffffff] hover:bg-[#FAABB0] hover:text-[#ffffff] text-[#FAABB0] font-bold py-2 px-4 rounded-full ring-2 ring-[#FAABB0] gap-2 flex flex-row items-center" onClick={onClick}>
            {title}<FontAwesomeIcon icon={faPlus} />
        </button>
    )
}