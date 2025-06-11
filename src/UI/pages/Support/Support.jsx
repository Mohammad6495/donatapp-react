import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import OrdinaryButton from "../../components/OrdinaryButton/OrdinaryButton";
import SupportTicketItem from "./components/SupportTicketItem";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { ticket_apiCalls } from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import "./styles/Support.scss";

const Support = () => {
  const [allTickets, setAllTickets] = useState();
  const { handleClose, handleOpen } = useLoadingContext();
  const navigate = useNavigate();

  const handleNavigationToCreateTicket = () => {
    navigate("/create-ticket");
  };

  // Get All Tickets
  const getAllTickets = () => {
    apiCaller({
      api: ticket_apiCalls.apiCall_getAllTickets,
      onSuccess: (resp) => {
        setAllTickets(resp?.data?.data);
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <section className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar">
      {/* <span className="fw-bold">این بخش در حال حاضر در دسترس نمیباشد</span> */}
      <div className="d-flex flex-column w-100">
        <div className="support-btn-ticket-holder w-100">
          <OrdinaryButton
            handleOnClick={handleNavigationToCreateTicket}
            buttonText="ایجاد تیکت"
            buttonClasses="py-3"
          />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="w-100 mt-3">
            <span className="fs-8">پیام های گذشته</span>
          </div>
          {allTickets?.map((item) => (
            <SupportTicketItem
              id={item?.id}
              priority={item?.priority}
              title={item?.title}
              updatedAtFormatted={item?.updatedAtFormatted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
