export default function Confirmation({ message }) {
    return (
        <div className="copy-popup absolute left-1/2 bottom-[10%] transform -translate-x-1/2 h-fit bg-[#faabb0] shadow-md rounded-full z-[999] px-20 py-4 animate-slide-up">
            <p className="text-sm font-bold text-white">{message}</p>
        </div>
    );
}
