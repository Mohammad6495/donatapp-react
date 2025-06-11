import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TicketPriorityRadioButtons from "./components/TicketPriorityRadioButton/TicketPriorityRadioButton";
import SectionTitleHolder from "../../components/SectionTitleHolder/SectionTitleHolder";
import OrdinaryButton from "../../components/OrdinaryButton/OrdinaryButton";
import { apiCaller } from "../../../core/custom-hooks/useApi";
import { ticket_apiCalls } from "../../../core/services/agent";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import { useNavigate } from "react-router";
import "./styles/CreateTicket.scss";

const CreateTicket = () => {
  const { handleClose, handleOpen } = useLoadingContext();
  const referenceData = [
    "بخش مدیریت",
    "بخش فلان",
    "بخش بسان",
    "بخش چنان",
    "بخش بمان",
  ];
  // const [referentialName, setReferentialName] = useState(referenceData[0]);
  const [selectedPriorityButtonId, setSelectedPriorityButtonId] = useState("2");
  const [titleText, setTitleText] = useState("");
  const [textareaText, setTextareaText] = useState("");

  const navigate = useNavigate();

  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       width: "250px",
  //     },
  //   },
  // };

  // // handle Select Change
  // const handleSelectChange = (event) => {
  //   setReferentialName(event?.target?.value);
  // };

  // handle priority Buttons Clicked
  const handlePriorityButtonsClick = (itemId) => {
    setSelectedPriorityButtonId(itemId);
  };

  // handle Title input change
  const handleTitleChange = (e) => {
    setTitleText(e?.target?.value);
  };

  // handle Text Area Change
  const handleTextAreaChange = (e) => {
    setTextareaText(e?.target?.value);
  };

  const createTicket = () => {
    apiCaller({
      api: ticket_apiCalls.apiCall_createTicket,
      apiArguments: {
        title: titleText,
        priority: selectedPriorityButtonId,
      },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          apiCaller({
            api: ticket_apiCalls.apiCall_addMessageToTicket,
            apiArguments: {
              ticketId: resp?.data?.data?.id,
              message: textareaText,
            },
            onSuccess: (resp) => {
              if (resp.status === 200 && resp.data.statusCode === 200) {
                navigate("/support");
              }
            },
            onError: (err) => {},
          });
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };

  // handle On Submitting Form
  const handleOnSubmit = (e) => {
    e?.preventDefault();
    createTicket();
  };

  return (
    <section className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar">
      <form onSubmit={handleOnSubmit} className="d-flex flex-column w-100">
        {/* Referential Select Option */}
        {/* <div className="referential-select-holder w-100">
          <InputLabel
            style={{ color: "#444444" }}
            className="mb-2"
            id="referential-select-label"
          >
            بخش ارجاعی
          </InputLabel>
          <Select
            labelId="referential-select-label"
            id="referential-select"
            value={referentialName}
            onChange={handleSelectChange}
            autoWidth
            // label=" آدرس"
            MenuProps={MenuProps}
            style={{
              width: "100%",
            }}
            defaultValue={referenceData[0]}
          >
            {referenceData?.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div> */}
        {/* Priority Select Section */}
        <SectionTitleHolder titleText="اولویت" />
        <div className="d-flex priority-select-section">
          <TicketPriorityRadioButtons
            priorityButtonsClickHandler={handlePriorityButtonsClick}
            currentItemId={selectedPriorityButtonId}
          />
        </div>
        {/* Priority Title Input */}
        <SectionTitleHolder titleText="موضوع" />
        <div className="d-flex justify-content-start align-items-center w-100">
          <input
            type="text"
            className="w-100 priority-title-input px-2 py-3"
            name="priority-title"
            id="priority-title-input"
            onChange={(e) => handleTitleChange(e)}
          />
        </div>
        {/* ticket text area */}
        <SectionTitleHolder titleText="متن" />
        <div className="d-flex justify-content-center align-items-center w-100">
          <textarea
            onChange={(e) => handleTextAreaChange(e)}
            className="w-100 ticket-text-area"
          />
        </div>
        {/* ticket file input */}
        {/* <div className="d-flex justify-content-between align-items-center mt-3 w-100    ">
          <span>n283e8bf.zip</span>
          <input
            className="d-none"
            type="file"
            name="ticket-file-input"
            id="ticket-file-input"
          />
          <label
            htmlFor="ticket-file-input"
            className="d-flex justify-content-start align-items-center ticket-file-input-label p-2"
          >
            ارسال فایل
          </label>
        </div> */}
        {/* submit button */}
        <OrdinaryButton
          buttonType="submit"
          buttonText="ارسال تیکت"
          holderClasses="mt-3"
        />
      </form>
    </section>
  );
};

export default CreateTicket;
