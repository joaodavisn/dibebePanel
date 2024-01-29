'use client'
import Image from "next/image";
import logo from "../../sources/media/images/logo.png";
import { useState } from "react";
import Error from "../components/Error";
export default function Register() {

    const [error, setError] = useState("Erro: Senha incorreta.");
    const [showError, setShowError] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("https://api.dibebe.net/functions.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `registerAdmin&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            });

            if (response.ok) {
                window.location.replace("/");
            } else {
                const data = await response.json();
                setError(data.error);
                setShowError(true);
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            setShowError(true);
        }
    };

    return (
        <main className="">
            <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
                <Image
                    src={logo}
                    alt="Logo"
                    width={200}
                    height={200}
                />
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input value={name} type="text" id="name" name="name" placeholder="Nome" className="w-full py-2 px-4 ring-1 ring-gray-300 rounded-full" onChange={handleNameChange} />
                    <input value={email} type="email" id="email" name="email" placeholder="Email" className="w-full py-2 px-4 ring-1 ring-gray-300 rounded-full" onChange={handleEmailChange} />
                    <input value={password} type="password" id="password" name="password" placeholder="Senha" className="w-full py-2 px-4 ring-1 ring-gray-300 rounded-full" onChange={handlePasswordChange} />
                    <button type="submit" className="w-full p-2 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full">Cadastrar</button>
                    <div className="flex flex-row items-center justify-center gap-4">
                        {showError && <Error error={error} />}
                    </div>
                </form>
                <a href="/" className="text-[#FAABB0] hover:text-[#f89aa0]">Fazer login</a>
            </div>
        </main>
    );
}
