import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CampaignItem from "../CampaignItem";
import { faClose, faPencil, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import moment from 'moment';
import Chart from 'chart.js/auto';
import Image from "next/image";
import Loading from "../Loading";
import CornerButton from "../CornerButton";
import balao from "@/sources/media/images/balloon.png";

export default function Campaigns({ userId, level }) {

  const [newCampaign, setNewCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignDestination, setCampaignDestination] = useState("");
  const [showCampaingDetails, setShowCampaignDetails] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [chartRendered, setChartRendered] = useState(false);
  const [campaignCreator, setCampaignCreator] = useState("");
  const [showEditCampaign, setShowEditCampaign] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function getDeviceOrigin(userAgent) {
    if (userAgent.includes("WhatsApp")) {
      return "WhatsApp";
    } else if (userAgent.includes("Android")) {
      return "Android";
    } else if (userAgent.includes("Windows NT")) {
      return "Windows";
    } else if (userAgent.includes("Macintosh")) {
      return "MacOS";
    } else if (userAgent.includes("Linux")) {
      return "Linux";
    } else if (userAgent.includes("iPhone")) {
      return "iOS";
    } else if (userAgent.includes("facebookexternalhit")) {
      return "Facebook";
    } else {
      return "Unknown device";
    }
  }

  useEffect(() => {
    if (showCampaingDetails && !chartRendered) {
      renderChart();
      renderDeviceChart();
      setChartRendered(true);
    }
  }, [showCampaingDetails, campaignDetails, chartRendered]);

  useEffect(() => {
    fetch("https://api.dibebe.net/functions.php?getCampaigns")
      .then(response => response.json())
      .then(data => setCampaigns(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://api.dibebe.net/functions.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `createCampaign&campaignName=${encodeURIComponent(campaignName)}&campaignDescription=${encodeURIComponent(campaignDescription)}&campaignDestination=${encodeURIComponent(campaignDestination)}&campaignCreator=${encodeURIComponent(userId)}`,
      });

      if (response.ok) {
        // refresh
        // window.location.reload();
        const data = await response.json();
        if (data.success) {
          setNewCampaign(false);
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }
      } else {
        const data = await response.json();

      }
    } catch (error) {
    }
  };

  if (!campaigns || campaigns.length === 0) {
    return (
      <Loading />
    )
  }

  const generateChartData = () => {
    const timestamps = campaignDetails[0].guests.map(guest => guest.timestamp);
    const data = Array(24).fill(0);

    timestamps.forEach(timestamp => {
      const hour = moment(timestamp).hour();
      data[hour]++;
    });

    return data;
  };

  const renderChart = () => {
    const ctx = document.getElementById('activityChart').getContext('2d');

    if (window.activityChart && typeof window.activityChart === 'object') {
      if (typeof window.activityChart.destroy === 'function') {
        window.activityChart.destroy();
      } else {
        console.warn('Chart instance does not have a destroy method.');
      }
    }

    const chartData = generateChartData();

    window.activityChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
          {
            label: 'Cliques',
            animation: true,
            fill: true,
            data: chartData,
            backgroundColor: 'rgba(250, 171, 176, 0.2)',
            borderColor: '#faabb0',
            borderWidth: 2,
            borderRadius: 10,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const generateDeviceChartData = () => {
    const devices = campaignDetails[0].guests.map(guest => getDeviceOrigin(guest.agent));
    const deviceCounts = devices.reduce((acc, device) => {
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});

    return deviceCounts;
  };

  const renderDeviceChart = () => {
    const ctx = document.getElementById('devicesChart').getContext('2d');

    if (window.deviceChart && typeof window.deviceChart === 'object') {
      if (typeof window.deviceChart.destroy === 'function') {
        window.deviceChart.destroy();
      } else {
        console.warn('Device chart instance does not have a destroy method.');
      }
    }

    const deviceData = generateDeviceChartData();

    window.deviceChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(deviceData),
        datasets: [
          {
            label: 'Origem do acesso',
            data: Object.values(deviceData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });
  };

  const getAdminData = async (userId) => {
    try {
      const response = await fetch(`https://api.dibebe.net/functions.php?getAdmin=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCampaignCreator(data.name);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  }

  const handleCampaignDetails = async (campaignId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.dibebe.net/functions.php?getCampaignDetails=${campaignId}`);
      if (response.ok) {
        const data = await response.json();
        setCampaignDetails(data);
        setIsLoading(false);
        setShowCampaignDetails(true);
        getAdminData(data[0].createdBy);
        setChartRendered(false);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-white">
      {isLoading &&
        <div className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center content-center bg-black bg-opacity-50 backdrop-blur-[2px] z-[99]">
          <Image src={balao} width={50} height={50} alt="Loading" className="animate-ping" />
        </div>
      }
      {newCampaign &&
        <Modal modalTitle={"Nova campanha"} closeClick={() => { setNewCampaign(!newCampaign) }}>
          <p className="text-[60pt] font-normal text-neutral-600">➕</p>
          <div className="p-1 text-center">
            <p className="text-xl my-2 font-normal text-neutral-600">
              Preencha os campos abaixo para criar uma nova campanha.
            </p>
            <form className="flex flex-col justify-start items-center gap-2" onSubmit={handleSubmit}>
              <label className="w-full flex flex-col justify-start items-start">
                <p className="text-left">Nome da campanha</p>
                <input className="w-full border-2 border-neutral-300 focus:border-[#faabb0] py-2 px-4 rounded-full" placeholder="Um título para ser fácil de identificar" type="text" value={campaignName} onChange={(event) => { setCampaignName(event.target.value) }} />
              </label>
              <label className="w-full flex flex-col justify-start items-start">
                <p className="text-left">Descrição da campanha</p>
                <input className="w-full border-2 border-neutral-300 focus:border-[#faabb0] py-2 px-4 rounded-full" placeholder="Uma descrição breve desta campanha" type="text" value={campaignDescription} onChange={(event) => { setCampaignDescription(event.target.value) }} />
              </label>
              <label className="w-full flex flex-col justify-start items-start">
                <p className="text-left">Destino da campanha</p>
                <input className="w-full border-2 border-neutral-300 focus:border-[#faabb0] py-2 px-4 rounded-full" placeholder="O link para onde a campanha deve levar" type="text" value={campaignDestination} onChange={(event) => { setCampaignDestination(event.target.value) }} />
              </label>
              <button className="w-full bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full py-4 px-8" type="submit">Criar campanha</button>
            </form>
          </div>
        </Modal>
      }
      {showCampaingDetails &&
        <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-[2px] z-[999] p-8">
          {showEditCampaign &&
            <Modal modalTitle={"Editar Campanha"} closeClick={() => { setShowEditCampaign(!showEditCampaign) }}>
              <p className="text-[60pt] font-normal text-neutral-600">✏️</p>
              <div className="p-1 text-center">
                <p className="text-xl my-2 font-normal text-neutral-600">
                  Preencha os campos abaixo para editar a campanha.
                </p>
                <form className="flex flex-col justify-start items-center gap-2" onSubmit={handleSubmit}>
                  <label className="w-full flex flex-col justify-start items-start">
                    <p className="text-left">Nome da campanha</p>
                    <input className="w-full border-2 border-neutral-300 focus:border-[#faabb0] py-2 px-4 rounded-full" placeholder="Um título para ser fácil de identificar" type="text" value={campaignName} onChange={(event) => { setCampaignName(event.target.value) }} />
                  </label>
                  <label className="w-full flex flex-col justify-start items-start">
                    <p className="text-left">Descrição da campanha</p>
                    <input className="w-full border-2 border-neutral-300 focus:border-[#faabb0] py-2 px-4 rounded-full" placeholder="Uma descrição breve desta campanha" type="text" value={campaignDescription} onChange={(event) => { setCampaignDescription(event.target.value) }} />
                  </label>
                  <label className="w-full flex flex-col justify-start items-start">
                    <p className="text-left">Destino da campanha</p>
                    <input className="w-full border-2 border-neutral-300 focus:border-[#faabb0] py-2 px-4 rounded-full" placeholder="O link para onde a campanha deve levar" type="text" value={campaignDestination} onChange={(event) => { setCampaignDestination(event.target.value) }} />
                  </label>
                  <button className="w-full bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full py-4 px-8" type="submit">Editar campanha</button>
                </form>
              </div>
            </Modal>
          }
          <div className="w-full h-full shadow-2xl drop-shadow-2xl bg-[#f7f7f7] p-1 rounded-2xl ring-2 ring-neutral-300">
            <div className="w-full h-fit flex flex-row justify-between py-2 pl-4 pr-2">
              <p className="text-xl font-normal text-neutral-600">
                Detalhes da campanha
              </p>
              <button
                className="w-8 h-8 bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full"
                onClick={() => { setShowCampaignDetails(!showCampaingDetails) }}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="text-center flex flex-col justify-start items-center gap-4 w-full overflow-auto p-2">
              <div className="w-full flex flex-row justify-start p-4 items-center gap-4">
                <div className="flex flex-col justify-center items-start gap-2">
                  <div className="bg-neutral-100 ring-2 ring-neutral-200 rounded-xl p-4 w-fit h-fit flex flex-col justify-between items-start gap-4">
                    <div className="flex flex-row justify-start items-start gap-2">
                      <p className="text-left">Nome da campanha:</p>
                      <p className="text-left font-bold">{campaignDetails[0].campaign}</p>
                    </div>
                    <div className="flex flex-row justify-start items-start gap-2">
                      <p className="text-left">Descrição da campanha:</p>
                      <p className="text-left font-bold">{campaignDetails[0].description}</p>
                    </div>
                    <div className="flex flex-row justify-start items-start gap-2">
                      <p className="text-left">Cliques no link:</p>
                      <p className="text-left font-bold">{campaignDetails[0].uses}</p>
                    </div>
                    <div className="flex flex-row justify-start items-start gap-2">
                      <p className="text-left">Criada por:</p>
                      <p className="text-left font-bold">{campaignCreator}</p>
                    </div>
                    <div className="w-full h-fit flex flex-row gap-2">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full flex flex-row items-center justify-center gap-2 py-2 px-4" onClick={() => { setShowEditCampaign(!showEditCampaign) }}><FontAwesomeIcon icon={faPencil} />Editar</button>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full flex flex-row items-center justify-center gap-2 py-2 px-4" onClick={() => { setShowEditCampaign(!showEditCampaign) }}><FontAwesomeIcon icon={faTrashAlt} />Excluir</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-neutral-300"></div>
              <div className="w-full h-fit flex flex-row justify-start gap-4 items-center p-4">
                <div className="bg-neutral-100 ring-2 ring-neutral-200 rounded-xl p-4 w-full h-fit flex flex-col justify-between items-center gap-4">
                  <p className="text-xl font-normal text-neutral-600">
                    Atividade por horário
                  </p>
                  <div className="w-full h-fit p-2">
                    <canvas id="activityChart" style={{ width: "100%" }} height="300"></canvas>
                  </div>
                </div>
                <div className="bg-neutral-100 ring-2 ring-neutral-200 rounded-xl p-4 w-fit h-fit flex flex-col justify-between items-center gap-4">
                  <p className="text-xl font-normal text-neutral-600">
                    Origem dos cliques
                  </p>
                  <div className="w-fit h-fit p-2">
                    <canvas id="devicesChart" width="300" height="200"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="w-full h-fit gap-4 flex flex-col overflow-y-auto rounded-lg">
        {campaigns
          .filter(campaign => campaign.createdBy === userId || level > 3)
          .map(campaign => (
            <CampaignItem
              key={campaign.id}
              campaignName={campaign.campaign}
              campaignDescription={campaign.description}
              campaignUrl={campaign.campaignUrl}
              camapignDestination={campaign.redirect}
              campaignUses={campaign.uses.toString()}
              onDetails={() => { handleCampaignDetails(campaign.id) }}
            />
          ))
        }
      </div>
      <CornerButton onClick={() => { setNewCampaign(!newCampaign) }} title={"Nova campanha"} />
    </div>
  )
}