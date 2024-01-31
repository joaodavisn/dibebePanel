import Image from "next/image";
import balao from "@/sources/media/images/balloon.png";

export default function Loading() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center content-center bg-white">
        <div className="w-full h-fit gap-4 flex flex-col justify-center items-center content-center">
            <Image src={balao} width={50} height={50} alt="Loading" className="animate-ping"/>
        </div>
      </div>
    )
}