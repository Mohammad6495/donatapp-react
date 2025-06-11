import React from "react";
import OrdinaryButton, {
  SimpleButton,
} from "../../components/OrdinaryButton/OrdinaryButton";
import BirthdaySupplyItem from "../CheckoutCart/components/BirthdaySupplyItem/BirthdaySupplyItem";
import CakeItem from "../CheckoutCart/components/CakeItem/CakeItem";
import "./styles/RefrigeratorCakeOrder.scss";

const RefrigeratorCakeOrder = () => {
  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      <div className="d-flex flex-column w-100">
        {/*  */}
        <div className="mt-2">
          <span className="fs-7">سفارش شما</span>
          <CakeItem />
          <BirthdaySupplyItem />
        </div>
        {/*  */}
        <div>
          <span className="fs-7">پیشنهاد ما</span>
          <div></div>
        </div>
        {/*  */}
        <div className="d-flex flex-column mt-2">
          <div className="d-flex justify-content-between align-items-center my-2">
            <span className="fs-8">کیک فردایی : </span>
            <span className="fs-8">100,000 تومان</span>
          </div>
          <div className="divider my-2"></div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="fs-8">مبلغ پرداختی : </span>
            <span className="fs-8">100,000 تومان</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="fs-8">مبلغ بیعانه : </span>
            <span className="fs-8">100,000 تومان</span>
          </div>
        </div>
        {/*  */}
        <div className="w-100">
          <OrdinaryButton buttonText="ثبت سفارش" holderClasses="my-3" />
          <SimpleButton
            buttonText="بازگشت و تغییر در سفارش"
            holderClasses="my-3"
          />
        </div>
      </div>
    </section>
  );
};

export default RefrigeratorCakeOrder;
