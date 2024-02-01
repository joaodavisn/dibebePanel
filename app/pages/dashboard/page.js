'use client'
import Image from "next/image";
import logo from "/sources/media/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faClose, faCog, faCubes, faNoteSticky, faPhone, faShop, faSignOut, faTruck, faUsers, faWrench } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Deliveries from "@/app/components/layouts/Deliveries";
import Rentings from "@/app/components/layouts/Rentings";
import Resume from "@/app/components/layouts/Resume";
import Produtos from "@/app/components/layouts/Products";
import Settings from "@/app/components/layouts/Settings";
import CRM from "@/app/components/layouts/CRM";
import Customers from "@/app/components/layouts/Customers";
import Manager from "@/app/components/layouts/Manager";
import SideButton from "@/app/components/SideButton";
import Campaigns from "@/app/components/layouts/Campaigns";

export default function Dashboard() {

    let url;
    if (typeof window !== 'undefined') {
        url = new URL(window.location.href);
    }

    if (typeof window !== 'undefined') {
        var token = localStorage.getItem("token");
    }

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [userId, setUserId] = useState("");
    const [level, setLevel] = useState("");
    var date = new Date();
    var hour = date.getHours();


    const [confirmLogout, setConfirmLogout] = useState(false);

    useEffect(() => {
        if (token) {
            const fullName = JSON.parse(token).name;
            const id = JSON.parse(token).id;
            setUserId(id);
            const userLevel = JSON.parse(token).level;
            setLevel(userLevel);
            const firstName = fullName.split(' ')[0];
            setName(firstName);
            setImage(JSON.parse(token).pfp);
        }
    }, [token]);

    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.replace("/");
        }
    }

    function logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("token");
            window.location.replace("/");
        }
    }

    const [screen, setScreen] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setScreen(url.searchParams.get("tab"));
        }
    }, []);


    function getTab() {
        const url = new URL(window.location.href);
        const tab = url.searchParams.get("tab");
        if (tab) {
            setScreen(tab);
        }
    }



    function setTab(tab) {
        setScreen(tab);
        if (typeof window !== 'undefined') {
            var url = new URL(window.location.href);
        }
        url.searchParams.set("tab", tab);
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', url);
        }
    }

    useEffect(() => {
        getTab();
    }
        , []);

    return (
        <main className="flex flex-row items-center justify-center h-screen w-full gap-4 py-4">
            {
                confirmLogout &&
                <div className="w-screen backdrop-blur-[2px] fixed h-screen bg-black bg-opacity-50 top-0 left-0 flex flex-col justify-center items-center z-50">
                    <div className="w-[50%] h-[70%] shadow-2xl drop-shadow-2xl bg-white rounded-xl flex flex-col justify-start items-center">
                        <div className="w-full h-12 bg-[#f7f7f7] rounded-t-xl flex flex-row justify-between items-center px-4">
                            <p className="text-xl my-12 font-normal text-neutral-600">
                                Sair da conta
                            </p>
                            <button
                                className="right-[500px] w-8 h-8 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full"
                                onClick={() => {
                                    setConfirmLogout(!confirmLogout);
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                        <div className="px-8 text-center items-center h-2/3 justify-center flex flex-col">
                            <p className="text-2xl my-12 font-normal text-neutral-600">
                                Tem certeza que deseja sair?
                            </p>
                            <div className="flex w-full flex-row gap-4 justify-center items-center">
                                <button
                                    className="w-full py-2 px-3 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    Sim
                                </button>
                                <button
                                    className="w-full py-2 px-3 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full"
                                    onClick={() => {
                                        setConfirmLogout(!confirmLogout);
                                    }}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="w-1/6 h-full bg-white flex flex-col items-center justify-between gap-4 p-4 border-r-[1px] border-b-[1px] border-t-[1px] rounded-r-2xl shadow-lg">
                <div className="flex flex-col gap-2 w-full justify-center items-center">
                    <Image src={logo} alt="Logo" width={130} height={130} />
                    <div className="w-full flex flex-row items-center gap-2">
                        <Image src={"https://cdn.dibebe.net/media/images/users/" + image} alt="Perfil" width={40} height={40} className="ring-1 rounded-full ring-neutral-300" />
                        <p className="text-center text-md text-neutral-500 font-normal">Olá {name}, {hour < 12 ? "bom dia" : hour < 18 ? "boa tarde" : "boa noite"}!</p>
                    </div>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <SideButton icon={faShop} text="Resumo" onClick={() => [setScreen("resumo"), setTab("resumo")]} selected={screen === "resumo"} />
                    <SideButton icon={faTruck} text="Entregas" onClick={() => [setScreen("entregas"), setTab("entregas")]} selected={screen === "entregas"} />
                    <SideButton icon={faCubes} text="Produtos" onClick={() => [setScreen("produtos"), setTab("produtos")]} selected={screen === "produtos"} />
                    {/* <SideButton icon={faNoteSticky} text="Alugueis" onClick={() => [setScreen("alugueis"), setTab("alugueis")]} selected={screen === "alugueis"} /> */}
                    {/* <SideButton icon={faPhone} text="CRM" onClick={() => [setScreen("crm"), setTab("crm")]} selected={screen === "crm"} /> */}
                    {/* <SideButton icon={faUsers} text="Clientes" onClick={() => [setScreen("clientes"), setTab("clientes")]} selected={screen === "clientes"} /> */}
                    <SideButton icon={faBullhorn} text="Campanhas" onClick={() => [setScreen("campanhas"), setTab("campanhas")]} selected={screen === "campanhas"} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    {/* <SideButton icon={faCog} text="Configurações" onClick={() => [setScreen("configuracoes"), setTab("configuracoes")]} selected={screen === "configuracoes"} /> */}
                    {/* <SideButton icon={faWrench} text="Gerenciador" onClick={() => [setScreen("gerenciador"), setTab("gerenciador")]} selected={screen === "gerenciador"} /> */}
                    <button
                        className="w-full py-2 px-3 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full flex flex-row items-center justify-between gap-2" onClick={() => { setConfirmLogout(!confirmLogout) }}>Sair<FontAwesomeIcon icon={faSignOut} /></button>

                </div>
            </div>
            <div className="w-5/6 h-full bg-white flex flex-col items-center justify-center gap-4 border-l-[1px] border-b-[1px] border-t-[1px] rounded-l-2xl shadow-lg p-4">
                {screen == "resumo" && <Resume />}
                {screen == "entregas" && <Deliveries />}
                {screen == "produtos" && <Produtos />}
                {screen == "alugueis" && <Rentings />}
                {screen == "crm" && <CRM />}
                {screen == "clientes" && <Customers />}
                {screen == "configuracoes" && <Settings />}
                {screen == "gerenciador" && <Manager />}
                {screen == "campanhas" && <Campaigns userId={userId} level={level} />}
            </div>
        </main>
    );
}
