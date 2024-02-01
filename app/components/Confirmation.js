export default function Confirmation({ message }) {
    return (
        <div className="copy-popup w-fit absolute left-[34%] bottom-[10%] h-fit bg-[#faabb0] shadow-md rounded-full z-[999] px-20 py-4 animate-slide-up">
            <p className="text-sm font-bold text-white">{message}</p>
        </div>
    )
}