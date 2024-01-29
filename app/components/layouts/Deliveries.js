import { useState } from "react";
import DeliveryInfo from "../DeliveryInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";

export default function Deliveries() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelItem, setCancelItem] = useState("");
  const [deliveries, setDeliveries] = useState([
    {
      code: "QBT354",
      item: "Mamaroo",
      deliveryDate: "10/10/2021",
      deliveryTime: "10:00",
      deliveryAddress: "Rua das Flores, 123",
      contact: "(11) 99999-9999",
      customer: "João da Silva",
      observations: "Não tocar a campainha, bebê dormindo.",
      status: "pending",
    },
    {
      code: "QBT355",
      item: "Mamaroo",
      deliveryDate: "10/10/2021",
      deliveryTime: "10:00",
      deliveryAddress: "Rua das Flores, 123",
      contact: "(11) 99999-9999",
      customer: "João da Silva",
      observations: "Não tocar a campainha, bebê dormindo.",
      status: "route",
    },
    {
      code: "QBT356",
      item: "Mamaroo",
      deliveryDate: "10/10/2021",
      deliveryTime: "10:00",
      deliveryAddress: "Rua das Flores, 123",
      contact: "(11) 99999-9999",
      customer: "João da Silva",
      observations: "Não tocar a campainha, bebê dormindo.",
      status: "delivered",
    },
    {
      code: "QBT357",
      item: "Mamaroo",
      deliveryDate: "10/10/2021",
      deliveryTime: "10:00",
      deliveryAddress: "Rua das Flores, 123",
      contact: "(74) 99929-3791",
      customer: "João Davi Souza Nascimento",
      observations: "Não tocar a campainha, bebê dormindo.",
      status: "cancelled",
      cancelReason: "Não tinha ninguém em casa",
    },
    {
      code: "QBT358",
      item: "Mamaroo",
      deliveryDate: "10/10/2021",
      deliveryTime: "10:00",
      deliveryAddress: "Rua das Flores, 123",
      contact: "(11) 99999-9999",
      customer: "João da Silva",
      observations: "Não tocar a campainha, bebê dormindo.",
      status: "pending",
    },
    {
      code: "QBT359",
      item: "Baby Swing",
      deliveryDate: "12/10/2021",
      deliveryTime: "14:30",
      deliveryAddress: "Av. Principal, 456",
      contact: "(11) 88888-8888",
      customer: "Maria Oliveira",
      observations: "Deixar na portaria, favor informar o porteiro.",
      status: "pending",
    },
    {
      code: "QBT360",
      item: "Diaper Bag",
      deliveryDate: "15/10/2021",
      deliveryTime: "12:00",
      deliveryAddress: "Rua das Árvores, 789",
      contact: "(11) 77777-7777",
      customer: "Carlos Santos",
      observations: "Entregar somente após às 14h.",
      status: "route",
    },
    {
      code: "QBT361",
      item: "Bottle Warmer",
      deliveryDate: "28/01/2024",
      deliveryTime: "16:45",
      deliveryAddress: "Alameda das Aves, 321",
      contact: "(11) 66666-6666",
      customer: "Ana Pereira",
      observations: "Cuidado, produto frágil!",
      status: "delivered",
    },
    {
      code: "QBT362",
      item: "Baby Monitor",
      deliveryDate: "20/10/2021",
      deliveryTime: "11:15",
      deliveryAddress: "Praça da Paz, 987",
      contact: "(11) 55555-5555",
      customer: "Luiz Oliveira",
      observations: "Deixar na caixa de correio.",
      status: "cancelled",
      cancelReason: "Endereço incorreto",
    },
    {
      code: "QBT363",
      item: "Stroller",
      deliveryDate: "22/10/2021",
      deliveryTime: "09:30",
      deliveryAddress: "Av. da Alegria, 654",
      contact: "(11) 44444-4444",
      customer: "Aline Rocha",
      observations: "Entregar com discrição, surpresa!",
      status: "pending",
    },

  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDeliveries = deliveries.filter((delivery) =>
    Object.values(delivery).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderDeliveriesByStatus = (title, status) => {
    const filteredStatusDeliveries = filteredDeliveries.filter(
      (delivery) => delivery.status === status
    );

    const onCancel = (code) => {
      setCancelItem(code);
      setShowCancelModal(!showCancelModal);
    }

    return (
      <div className="w-1/4 h-full flex flex-col justify-start items-center bg-transparent">
        <p className="text-2xl font-bold text-neutral-600">{title}</p>
        <div className="gap-3 overflow-y-auto flex flex-col justify-start items-center w-full max-h-[95%] py-4">
          {filteredStatusDeliveries.map((delivery, index) => (
            <DeliveryInfo
              key={index}
              code={delivery.code}
              item={delivery.item}
              deliveryDate={delivery.deliveryDate}
              deliveryTime={delivery.deliveryTime}
              deliveryAddress={delivery.deliveryAddress}
              contact={delivery.contact}
              customer={delivery.customer}
              observations={delivery.observations}
              status={delivery.status}
              cancelReason={delivery.cancelReason}
              onCancel={() => { onCancel(delivery.code) }}
            />
          ))}
        </div>
      </div>
    );
  };

  const [cancelReason, setCancelReason] = useState("");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-transparent">
      {showCancelModal && (
        <Modal modalTitle={"Cancelar entrega"} closeClick={() => { [setShowCancelModal(!showCancelModal), setCancelReason(""), setCancelItem("")] }}>
          <div className="px-8 text-center">
            <p className="text-2xl my-12 font-normal text-neutral-600">
              Para cancelar a entrega{" "}
              <span className="font-bold">{cancelItem}</span> você deve primeiro
              informar um motivo:
            </p>
          </div>
          <textarea
            className="w-[90%] h-[50%] p-4 resize-none bg-transparent border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-[#FAABB0]"
            placeholder="Digite aqui o motivo do cancelamento"
            value={cancelReason}
            onChange={(event) => {
              setCancelReason(event.target.value);
            }}
          ></textarea>
          <div className="flex flex-col w-[90%] justify-center items-end gap-4">
            {cancelReason.length > 20 && (
              <button
                className="w-fit px-8 h-12 bg-red-500 mt-12 hover:bg-red-700 text-white rounded-full flex flex-row items-center justify-center gap-2"
                onClick={() => {
                  setCancelItem("");
                  setShowCancelModal(!showCancelModal);
                }}
              >
                Cancelar entrega
              </button>
            )}
          </div>
        </Modal>
      )}
      <div className="w-full h-32 px-6">
        <input
          className="w-full h-10 px-3 rounded-full border-2 border-neutral-200 focus:outline-none focus:border-[#FAABB0]"
          type="text"
          placeholder="Pesquisar entrega"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="w-full h-[90%] flex flex-row justify-center items-center my-4 bg-transparent">
        {renderDeliveriesByStatus("Pendentes", "pending")}
        <div className="h-full w-[1px] bg-neutral-200"></div>
        {renderDeliveriesByStatus("Em rota", "route")}
        <div className="h-full w-[1px] bg-neutral-200"></div>
        {renderDeliveriesByStatus("Entregues", "delivered")}
        <div className="h-full w-[1px] bg-neutral-200"></div>
        {renderDeliveriesByStatus("Cancelados", "cancelled")}
      </div>
      <button className="absolute bottom-12 right-8 w-fit text-sm bg-[#ffffff] hover:bg-[#FAABB0] hover:text-[#ffffff] text-[#FAABB0] font-bold py-2 px-4 rounded-full ring-2 ring-[#FAABB0] gap-2 flex flex-row items-center">
        Nova entrega<FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}