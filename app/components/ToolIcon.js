import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ToolIcon({ icon, title, onClick }) {
    return (
        <div className="w-fit h-fit p-4 bg-[#f7f7f7] rounded-lg gap-4 items-center justify-center flex flex-col ring-2 ring-neutral-200 shadow-lg">
            <FontAwesomeIcon icon={icon} style={{ fontSize: 50 }} className="text-neutral-700"/>
            <p className="text-lg">{title}</p>
            <button className="w-full h-12 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-lg" onClick={onClick}>Abrir</button>
        </div>
    )
}