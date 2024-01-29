import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CampaignItem from "../CampaignItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Modal from "../Modal";

export default function Campaigns({ userId }) {

  const [newCampaign, setNewCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignDestination, setCampaignDestination] = useState("");

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
          window.location.reload();
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
      <div className="w-full h-fit gap-4 flex flex-col">
        {campaigns.map(campaign => (
          <CampaignItem
            key={campaign.id}
            campaignName={campaign.campaign}
            campaignDescription={campaign.description}
            campaignUrl={campaign.campaignUrl}
            camapignDestination={campaign.redirect}
            campaignUses={campaign.uses.toString()}
          />
        ))}
      </div>
      <button className="absolute bottom-12 right-8 w-fit text-sm bg-[#ffffff] hover:bg-[#FAABB0] hover:text-[#ffffff] text-[#FAABB0] font-bold py-2 px-4 rounded-full ring-2 ring-[#FAABB0] gap-2 flex flex-row items-center" onClick={() => { setNewCampaign(!newCampaign) }}>
        Nova campanha<FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}