import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideButton({ icon, text, onClick, selected }) {
    return (
        <button onClick={onClick} className={`w-full py-2 px-3 ${selected ? "bg-[#ff7780] hover:bg-[#e15962]" : "bg-[#FAABB0] hover:bg-[#f89aa0]"} text-white rounded-full flex flex-row items-center justify-between gap-2`}>{text}<FontAwesomeIcon icon={icon} /></button>
    )
}
