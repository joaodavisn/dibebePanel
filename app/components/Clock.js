import { useEffect, useState } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Clock() {
  const [time, setTime] = useState(getCurrentTime);

  function getCurrentTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return `${hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-row items-center justify-center text-neutral-700 gap-1 bg-neutral-50 ring-1 ring-neutral-300 rounded-xl pl-1 pr-2">
      <FontAwesomeIcon icon={faClock} />
      <p>{time}</p>
    </div>
  );
}
