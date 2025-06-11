import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { ticket_apiCalls } from "../../../../core/services/agent";
import { useLoadingContext } from "../../../../core/contexts/LoadingContext/LoadingContext";
import Send from "@mui/icons-material/Send";
import TicketDetailItem from "./TicketDetailItem";
import { Alert } from "@mui/material";
import "./TicketDetail.scss";

const TicketDetail = () => {
  const { handleClose, handleOpen } = useLoadingContext();
  const { id } = useParams();

  // States
  const [ticketInfoDetails, setTicketInfoDetails] = useState();
  const [ticketMessages, setTicketMessages] = useState([]);
  const [messageInputText, setMessageInputText] = useState("");

  // Get Current Ticket's Detail
  const getCurrentTicketDetail = () => {
    apiCaller({
      api: ticket_apiCalls.apiCall_getTicketDetail,
      apiArguments: id,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          setTicketInfoDetails(resp.data?.data?.details);
          setTicketMessages(resp.data?.data?.messages);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  useEffect(() => {
    getCurrentTicketDetail();
  }, [id]);

  // handleInputTextChange
  const handleInputTextChange = (e) => {
    setMessageInputText(e?.target?.value);
  };

  // Create a Message
  const createNewMessage = () => {
    apiCaller({
      api: ticket_apiCalls.apiCall_addMessageToTicket,
      apiArguments: {
        ticketId: id,
        message: messageInputText,
      },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          getCurrentTicketDetail();
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  // handle On Submit Form
  const handleOnSubmitForm = (e) => {
    e?.preventDefault();
    createNewMessage();
  };

  return (
    <section className="ticket-detail-holder d-flex flex-column w-100 h-100">
      {/* detail-info-holder" */}
      <div className="shadow detail-info-holder d-flex flex-column gap-1 w-100 p-2">
        {/* id, priority, title, updatedAtFormatted */}
        <div className="w-100 d-flex justify-content-between align-items-center">
          <span className="text-caro-primary">شماره تیکت : {id}</span>
          {ticketInfoDetails?.priority == 0 && (
            <span className="text-caro-primary">اولویت: بالا</span>
          )}
          {ticketInfoDetails?.priority == 1 && (
            <span className="text-caro-primary">اولویت: متوسط</span>
          )}
          {ticketInfoDetails?.priority == 2 && (
            <span className="text-caro-primary">اولویت: پایین</span>
          )}
        </div>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <span>
            موضوع : <span className="fs-8">{ticketInfoDetails?.title}</span>
          </span>
          <span>{ticketInfoDetails?.updatedAtFormatted}</span>
        </div>
      </div>
      {/* detail-chat-holder */}
      <div className="w-100 detail-chat-holder pb-5">
        {ticketMessages?.length <= 0 ? (
          <div className="d-flex w-100 mt-4">
            <Alert className="w-100" severity="warning">
              پیامی موجود نیست
            </Alert>
          </div>
        ) : (
          <div className="w-100 h-100 d-flex flex-column justify-content-start align-items-center detail-chat-container thin-scrollbar px-2">
            {ticketMessages?.map((item) => (
              <TicketDetailItem
                message={item?.message}
                isSentByUser={item?.sentByUser}
                messageDate={item?.updatedAt}
              />
            ))}
          </div>
        )}
      </div>
      {/* ticket-input-holder */}
      <div className="create-new-ticket-input-holder mt-1 position-fixed ">
        <form
          onSubmit={(e) => handleOnSubmitForm(e)}
          className="w-100 d-flex justify-content-between align-items-center w-100 create-ticket-form"
        >
          <div className="" style={{ width: "90%" }}>
            <input
              style={{ outline: "none" }}
              type="text"
              className="w-100 px-3 py-2 ticket-text-input border-0 rounded"
              name="ticket-text"
              id="ticket-text-input"
              onChange={(e) => handleInputTextChange(e)}
            />
          </div>
          <button
            style={{
              transform: "rotateZ(-180deg)",
              width: "10%",
              backgroundColor: "transparent",
            }}
            className="d-flex justify-content-center align-items-center cursor-pointer border-0"
          >
            <Send htmlColor="#CB7640" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default TicketDetail;
