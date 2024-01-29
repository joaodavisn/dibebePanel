import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({ children, modalTitle, closeClick }) {
    return (
        <div className="w-screen backdrop-blur-[2px] fixed h-screen bg-black bg-opacity-50 top-0 left-0 flex flex-col justify-center items-center z-50">
            <div className="w-[50%] h-[70%] shadow-2xl drop-shadow-2xl bg-white rounded-xl flex flex-col justify-start items-center">
                <div className="w-full h-12 bg-[#f7f7f7] rounded-t-xl flex flex-row justify-between items-center px-4">
                    <p className="text-xl my-12 font-normal text-neutral-600">
                        {modalTitle}
                    </p>
                    <button
                        className="right-[500px] w-8 h-8 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full"
                        onClick={closeClick}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}