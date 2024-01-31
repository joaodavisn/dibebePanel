import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CampaignItem from "../CampaignItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import moment from 'moment';
import Chart from 'chart.js/auto';

export default function Campaigns({ userId }) {

  const [newCampaign, setNewCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignDestination, setCampaignDestination] = useState("");
  const [showCampaingDetails, setShowCampaignDetails] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [chartRendered, setChartRendered] = useState(false);
  const [campaignCreator, setCampaignCreator] = useState("");

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
        // setError(data.error);
        // setShowError(true);
      }
    } catch (error) {
      // setError("An error occurred. Please try again later.");
      // setShowError(true);
    }
  };





  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-start items-center bg-white">
        <div className="w-full h-fit gap-4 flex flex-col">
          <p className="text-xl my-12 font-normal text-neutral-600">
            Carregando campanhas...
          </p>
        </div>
      </div>
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
            label: 'Acessos por horário',
            data: chartData,
            backgroundColor: 'rgba(250, 171, 176, 0.2)',
            borderColor: '#faabb0',
            borderWidth: 2,
            borderRadius: 10,
            tension: 0.3
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
    
    try {
      const response = await fetch(`https://api.dibebe.net/functions.php?getCampaignDetails=${campaignId}`);
      if (response.ok) {
        const data = await response.json();
        setCampaignDetails(data);
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
      {newCampaign &&
        <Modal modalTitle={"Nova campanha"} closeClick={() => { setNewCampaign(!newCampaign) }}>
          <div className="p-1 text-center">
            <p className="text-xl my-12 font-normal text-neutral-600">
              Preencha os campos abaixo para criar uma nova campanha.
            </p>
            <form className="flex flex-col justify-start items-center gap-4" onSubmit={handleSubmit}>
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
              <button className="w-full bg-[#FAABB0] hover:bg-[#f89aa0] text-white rounded-full mt-10 py-4 px-8" type="submit">Criar campanha</button>
            </form>
          </div>
        </Modal>
      }
      {showCampaingDetails &&
        <Modal modalTitle={"Detalhes da campanha"} closeClick={() => { setShowCampaignDetails(!showCampaingDetails) }}>
          <div className="text-center flex flex-col justify-start items-center gap-4 w-full overflow-auto">
            <p className="text-xl my-12 font-normal text-neutral-600">
              Detalhes da campanha
            </p>
            <div className="w-full flex flex-row justify-between items-center gap-4">
              <div className="flex flex-col justify-start items-start gap-2">
              
                  <div className="flex flex-col justify-start items-start gap-2">
                    <p className="text-left">Nome da campanha: {campaignDetails[0].campaign}</p>
                    <p className="text-left">Descrição da campanha: {campaignDetails[0].description}</p>
                    <div className="flex flex-row justify-start items-start gap-2">
                      <p className="text-left">Criada por:</p>
                      <p className="text-left font-bold">{campaignCreator}</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className="w-fit h-fit p-2">
              <canvas id="activityChart" width="600" height="300"></canvas>
            </div>
            <canvas id="devicesChart" width="100" height="100"></canvas>
          </div>
        </Modal>
      }
      <div className="w-full h-fit gap-4 flex flex-col">
        {campaigns.map(campaign => (
          <CampaignItem
            key={campaign.id}
            campaignName={campaign.campaign}
            campaignDescription={campaign.description}
            campaignUrl={campaign.campaignUrl}
            camapignDestination={campaign.redirect}
            campaignUses={campaign.uses.toString()}
            onDetails={() => { handleCampaignDetails(campaign.id) }}
          />
        ))}
      </div>
      <button className="absolute bottom-12 right-8 w-fit text-sm bg-[#ffffff] hover:bg-[#FAABB0] hover:text-[#ffffff] text-[#FAABB0] font-bold py-2 px-4 rounded-full ring-2 ring-[#FAABB0] gap-2 flex flex-row items-center" onClick={() => { setNewCampaign(!newCampaign) }}>
        Nova campanha<FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}