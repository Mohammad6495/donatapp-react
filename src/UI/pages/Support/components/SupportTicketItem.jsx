import React from "react";
import { Square } from "@mui/icons-material";
import defImg from "../../../../assets/images/support-ticket.png";
// import defImg from "../../../../assets/images/CaroLogo/headerLogo.png";
import "./SupportTicketItem.scss";
import { useNavigate } from "react-router";
import { truncateStringFunction } from "../../../../core/utility/helperFunctions";

const SupportTicketItem = ({ id, priority, title, updatedAtFormatted }) => {
  const navigate = useNavigate();

  // Handle Navigate To Ticket Detail
  const handleNavigateToTicketDetail = (ticketId) => {
    navigate(`/ticket-detail/` + ticketId);
  };

  return (
    <div
      onClick={() => handleNavigateToTicketDetail(id)}
      className="d-flex justify-content-start align-items-center align-items-center ticket-item-holder w-100 p-2 my-2 cursor-pointer noselect"
    >
      <div className="d-flex justify-content-center align-items-center">
        <img style={{ maxWidth: "100px" }} src={defImg} alt="NO_PIC" />
      </div>
      <div className="d-flex flex-column gap-3 flex-grow-1 ms-2">
        <div className="d-flex justify-content-between align-items-center ticket-number-holder">
          <span className="text-caro-primary fw-bold">کد تیکت : {id}</span>
          <span className="text-secondary">{updatedAtFormatted}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center ticket-number-holder">
          <span className="fw-bold text-truncate">
            <span>موضوع : </span>
            <span className="w-50 fs-8">
              {truncateStringFunction(title, 10)}
            </span>
          </span>
          <div>
            {priority == 0 && <Square fontSize="small" htmlColor="#f00c0c" />}
            {priority == 1 && <Square fontSize="small" htmlColor="#e69710" />}
            {priority == 2 && <Square fontSize="small" htmlColor="#349918" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketItem;
