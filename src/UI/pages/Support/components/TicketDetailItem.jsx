import React from "react";
import { toPersianDateConverter } from "../../../../core/utility/helperFunctions";
import "./TicketDetailItem.scss";

const TicketDetailItem = ({ message, isSentByUser, messageDate }) => {
  return (
    <div className="w-100 d-flex ticket-detail-item-holder my-2">
      {!isSentByUser ? (
        <div className="isSentByUser-holder p-2 w-75 ms-auto">
          <div className="isSentByUser d-flex flex-column w-100 p-2">
            <span>{message}</span>
            <span className="align-self-end fs-8 mt-1 text-muted">
              {toPersianDateConverter(messageDate)}
            </span>
          </div>
        </div>
      ) : (
        <div className="isSentByAdmin-holder p-2 w-75">
          <div className="isSentByAdmin d-flex flex-column w-100 p-2">
            <span>{message}</span>
            <span className="align-self-end fs-8 mt-1 text-muted">
              {toPersianDateConverter(messageDate)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailItem;
