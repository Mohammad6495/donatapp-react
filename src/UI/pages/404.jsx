import React from "react";
import { Button } from "@mui/material";
import { LastPage, Home, Reply } from "@mui/icons-material";
import caroIcon from "../../assets/images/CaroLogo/loading.png";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section
      className="d-flex flex-column justify-content-center align-items-center "
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="d-flex gap-1 justify-content-center align-items-center w-100">
        <span style={{ fontSize: "6rem" }} className="text-caro-primary">
          4
        </span>
        <img
          style={{ maxWidth: "80px", maxHeight: "80px" }}
          src={caroIcon}
          alt="NO_PIC"
        />
        <span style={{ fontSize: "6rem" }} className="text-caro-primary">
          4
        </span>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <span className="text-caro-primary fw-bold">
          صفحه مورد نظر در دسترس نیست!
        </span>
      </div>
      <div className="w-100 p-4 d-flex flex-column justify-content-center align-items-center mt-3">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          color="primary"
          variant="outlined"
          className="w-100 py-2 fw-bold"
          style={{
            marginTop: "150px",
            borderWidth: "2px",
          }}
          endIcon={<Reply fontSize="large" />}
        >
          بازگشت به صفحه قبل
        </Button>
        <Button
          onClick={() => {
            navigate("/?pageId=0");
          }}
          color="primary"
          variant="outlined"
          className="w-100 py-2 fw-bold mt-1"
          style={{
            borderWidth: "2px",
          }}
          endIcon={<Home fontSize="large" />}
        >
          بازگشت به خانه
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
