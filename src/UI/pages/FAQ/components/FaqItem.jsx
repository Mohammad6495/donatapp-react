import React, { useState } from "react";
import { Cancel, Add } from "@mui/icons-material";
import "./styles/FaqItem.scss";

const FaqItem = ({
  number = "01",
  question = "چطور یک متن را از مرورگر اینترنت کپی کنیم؟",
  answer = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است",
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenCloseItem = () => {
    setOpen(!open);
  };

  return (
    <div className="d-flex flex-column my-3">
      {/* top section */}
      <div className="d-flex justify-content-between align-items-center top-section px-2">
        <span className="font-iransansWeb text-caro-primary fw-bold fs-8">
          {number}
        </span>
        <span className="px-2">{question}</span>
        <div
          onClick={handleOpenCloseItem}
          className="d-flex justify-content-center align-items-center cursor-pointer"
        >
          {open ? <Cancel htmlColor="#CB7640" /> : <Add htmlColor="#CB7640" />}
        </div>
      </div>
      {/* bottom section */}
      <div className={`d-flex bottom-section ${open ? "is-open" : "is-close"}`}>
        <p className="p-0 m-0 px-2 fs-8 my-2">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
