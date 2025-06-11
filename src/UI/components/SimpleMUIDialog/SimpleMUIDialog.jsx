import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

import "./styles/SimpleMUIDialog.scss";


const SimpleMUIDialog = ({
  closeDialogHandler,
  openDialog,
  children,
  dialogTitle,
}) => {
  return (
    <div className="">
      <Modal className="p-2" onHide={closeDialogHandler} show={openDialog}  backdrop="static"
        keyboard={false}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex justify-content-around align-items-center py-2 dialog-close-icon-holder w-100 px-1">
            {/* <span onClick={closeDialogHandler} className="dialog-close-icon" /> */}
            <span dir="rtl" className="w-100 fs-6 pt-2 ps-4 ">
              {dialogTitle}
            </span>
          </div>
          {/* <DialogTitle className="p-0 m-0 m-2" style={{ fontSize: "14px" }}>
            {dialogTitle}
          </DialogTitle> */}
        </div>
        <div className="p-2">{children}</div>
      </Modal>
    </div>
  );
};

export default SimpleMUIDialog;
