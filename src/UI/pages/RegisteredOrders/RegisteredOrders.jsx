import React from "react";
import { useNavigate } from "react-router";
import tickImg from "../../../assets/images/tick-box.svg";
import OrdinaryButton, {
  SimpleButton,
} from "./../../components/OrdinaryButton/OrdinaryButton";
import "./styles/RegisteredOrders.scss";

const RegisteredOrders = () => {
  const navigate = useNavigate();

  const handleNavigate = (s) => {
    s === 1 ? navigate("/order-tracking") : navigate("/", { replace: true });
  };

  return (
    <section
      style={{ height: "100vh", overflowY: "auto" }}
      className="m-0 p-0 p-2 py-4 d-flex flex-column justify-content-start align-items-center w-100 registered-orders-holder hidden-scrollbar"
    >
      {/* tick box */}
      <div className="order-tick-box-holder d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center order-tick-box">
          <img src={tickImg} alt="NO_PIC" className="order-tick-img w-100" />
        </div>
      </div>
      {/* text box */}
      <div className=" d-flex flex-column justify-content-center align-items-center px-2">
        <span style={{ fontSize: "1.1rem" }} className="mt-4 fw-bold">
          سفارش شما ثبت شد
        </span>
        <p
          style={{ fontSize: "0.8rem" }}
          className="p-0 m-0 mt-2 d-flex justify-content-center align-items-center text-start"
        >
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد.
        </p>
      </div>
      {/* buttons box */}
      <div className="d-flex flex-column justify-content-center align-items-center w-100 my-4 px-2">
        <OrdinaryButton
          handleOnClick={() => handleNavigate(1)}
          buttonText="پیگیری سفارش"
          holderClasses="w-100 my-2"
        />
        <SimpleButton
          buttonText="بازگشت به صفحه اصلی"
          holderClasses="w-100 my-1"
          handleOnClick={() => handleNavigate(0)}
        />
      </div>
    </section>
  );
};

export default RegisteredOrders;
