'use client'
import Image from "next/image";
import logo from "../sources/media/images/logo.png";
import { useState } from "react";
import Error from "./components/Error";
export default function Home() {
  const [error, setError] = useState("Erro: Senha incorreta.");
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await fetch(
        "https://api.dibebe.net/functions.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `authAdmin&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem("token", JSON.stringify(data));
          window.location.replace("/pages/dashboard?tab=resumo");
        }
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
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full py-2 px-4 ring-1 ring-gray-300 rounded-full"
            onChange={handleEmailChange}
          />
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            className="w-full py-2 px-4 ring-1 ring-gray-300 rounded-full"
            onChange={handlePasswordChange}
          />
          {!loading && <button
            type="submit"
            className="w-full p-2 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full"
          >
            Entrar
          </button>}
          {loading && <button
            type="submit"
            className="w-full p-2 bg-[#afafaf] hover:bg-[#afafaf] text-white rounded-full"
          >
            Carregando...
          </button>}
          <div className="flex flex-row items-center justify-center gap-4 cursor-not-allowed disabled">
            {showError && <Error error={error} />}
          </div>
        </form>
        <a href="/cadastro" className="text-[#FAABB0] hover:text-[#f89aa0]">Criar conta</a>
      </div>
    </main>
  );
}
