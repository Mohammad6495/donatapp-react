import React from "react";
import { priorityRadioButtonsData } from "./../../utils/priorityRadioButtonsData";
import "./styles/TicketPriorityRadioButtons.scss";

const TicketPriorityRadioButtons = ({
  priorityButtonsClickHandler,
  currentItemId,
}) => {
  return (
    <>
      {priorityRadioButtonsData?.map((item) => (
        <div
          onChange={() => priorityButtonsClickHandler(item?.id)}
          className="d-flex justify-content-center align-items-center priority-inputs-holder col-4 cursor-pointer my-2 ms-2"
        >
          <input
            id={`${item?.labelText}-priority-input`}
            name="priority-inputs"
            type="radio"
          />
          <label
            className={`me-2 cursor-pointer priority-first-label ${
              currentItemId == item?.id ? "selected" : ""
            }`}
            htmlFor={`${item?.labelText}-priority-input`}
          />
          <label
            htmlFor={`${item?.labelText}-priority-input`}
            className="d-flex flex-grow-1 cursor-pointer priority-second-label"
          >
            {item?.title}
          </label>
        </div>
      ))}
    </>
  );
};

export default TicketPriorityRadioButtons;
