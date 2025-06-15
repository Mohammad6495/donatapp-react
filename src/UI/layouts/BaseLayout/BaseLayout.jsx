import React from "react";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useLocation } from "react-router";
import "./styles/BaseLayout.scss";
import { useShopBasketContext } from "../../../core/contexts/ShopBasket/shopBasket.ctx";

const BaseLayout = ({ children }) => {
  ///constex
  const {  paymentWay } = useShopBasketContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackNavigatePage = () => {
    if (location?.pathname === "/refrigerator-cake") {
      navigate("/");
    } else if (location?.pathname === "/cookie") {
      navigate("/");
    } else if (location?.pathname === "/general-order-details/") {
      navigate("/general-order-tracking");
    } else {
      navigate(-1);
    }
  };

  /////////////
  return (
    <>
      <section
        className="d-flex flex-column justify-content-start align-items-center base-section-holder p-0 m-0 w-100 px-3"
      >
        <div
          className="w-100"
          style={{
            height: "60px",
          }}
        ></div>

        <div
          style={{
            position: "fixed",
            top: "env(safe-area-inset-top)",
            left: "0",
            right: "0",
            width: "calc(100vw)",
            maxWidth: "calc(576px)",
            margin: "0 auto",
            backgroundColor: "#fff",
            zIndex: "999",
            boxShadow: "0 3px 3px 3px #ebebeb",
          }}
          className="d-flex flex-column flex-row justify-content-between align-items-center"
        >
  

          <div
            className="d-flex flex-row justify-content-between align-items-center w-100"
            style={{ padding: "20px" }}
          >
            <span
              className="d-flex flex-row justify-content-start align-items-baseline"
              style={{
                color: "##C36428",
                fontSize: "17px",
                fontWeight: "bold",
              }}
            >
              {location?.pathname === "/profile" ? "پروفایل" : ""}
              {location?.pathname === "/selected-norouzi-items"
                ? "محصولات ویژه نوروز"
                : ""}
              {location?.pathname === "/edit-profile" ? "تکمیل پروفایل" : ""}
              {location?.pathname === "/calc-price" ? "محاسبه مسیر" : ""}
              {location?.pathname === "/add-address" ? "اضافه کردن آدرس" : ""}
              {location?.pathname === "/tomorrow-cake-orders"
                ? "لیست سفارشات کیک فردایی و پسفردایی"
                : ""}
              {location?.pathname === "/checkout-cart"
                ? !paymentWay
                  ? "نحوه پرداخت"
                  : "سبد خرید"
                : ""}

              {location?.pathname === "/general-order-tracking"
                ? "سفارشات"
                : ""}
              {location?.pathname === "/order-tracking" ? "پیگیری سفارش" : ""}
              {location?.pathname === "/cake-order" ? "سفارش کیک" : ""}
              {location?.pathname === "/norouzi" ? "محصولات ویژه نوروز" : ""}
              {/* tomorrow cake */}
              {location?.pathname === "/tomorrow-cake" ? "کیک فردایی" : ""}
              {location?.pathname === "/tomarrow-cake-carousel"
                ? "کیک فردایی"
                : ""}
              {location?.pathname === "/norouzi-cart" ? "محصولات نوروزی" : ""}
              {location?.pathname === "/general-cake-order-tracking"
                ? "سفارش کیک"
                : ""}
              {location?.pathname.includes("/general-cake-order-details")
                ? "جزییات سفارش"
                : ""}
              {location?.pathname.includes("/tomorrow-cake-details")
                ? "کیک فردایی"
                : ""}
              {location?.pathname === "/tomorrow-cake-order-submit"
                ? "کیک فردایی"
                : ""}
              {location?.pathname === "/favorite-list" ? "علاقه مندی ها" : ""}
              {location?.pathname.includes("favorite-tomarrow")
                ? "جزییات محصول"
                : ""}
              {location?.pathname.includes("favorite-refrigerator")
                ? "جزییات محصول"
                : ""}
              {location?.pathname.includes("track-tomorrow-cake-order")
                ? "جزییات سفارش"
                : ""}

              {location?.pathname.includes("/redirect-cake-detail")
                ? "جزئیات کیک"
                : ""}
              {location?.pathname.includes("/more-address")
                ? "دیگر آدرس ها"
                : ""}

              {location?.pathname.includes("/success-payment")
                ? "وضعیت پرداخت"
                : ""}
              {/* refrigerator cake */}
              {location?.pathname === "/refrigerator-cake" ? "کیک ها" : ""}
              {location?.pathname.includes("/refrigerator-cake-details")
                ? "کیک"
                : ""}
              {location?.pathname === "/refrigerator-cake-order-submit"
                ? "کیک"
                : ""}
              {/* {location?.pathname === "/tomorrow-cake/" ? "کیک فردایی" : ""} */}

              {location?.pathname == "/birthday" ? "ثبت مناسبت عزیزان" : ""}
              {location?.pathname.includes("/creamy-cookie") ? "شیرینی تر" : ""}
              {location?.pathname.includes("/general-order-details")
                ? "جزئیات سفارش"
                : ""}
              {location?.pathname.includes("/general-order-details") ? (
                <div
                  id="code-place-holder"
                  className=" flex-row justify-content-start align-items-baseline ms-1 d-none"
                >
                  <span>{` : `}</span>
                  <code dir="ltr" id="code-place" className="ms-1"></code>
                </div>
              ) : (
                ""
              )}

              {location?.pathname.includes("/choosing-box")
                ? "انتخاب جعبه"
                : ""}
     
              {location?.pathname.includes("/cookie") ? "شیرینی " : ""}
              {location?.pathname === "/bakery" ? "بیکری" : ""}

              {location?.pathname === "/dessert" ? "دسر" : ""}
              {location?.pathname === "/refferer-code" ? "دعوت از دوستان" : ""}
              {location?.pathname === "/choosing-box" ? "انتخاب جعبه" : ""}
              {location?.pathname === "/rules" ? "قوانین و مقررات" : ""}
              {location?.pathname === "/faq" ? "سوالات متداول" : ""}
              {location?.pathname === "/support" ? "پشتیبانی" : ""}
              {location?.pathname === "/aboutus" ? "درباره دونات" : ""}
              {location?.pathname === "/create-ticket" ? "پشتیبانی" : ""}
              {location?.pathname === "/cake-order-list" ? "سفارشات کیک" : ""}
              {location?.pathname === "/select-final-cake" ? "سفارشات کیک" : ""}
              {location?.pathname === "/category-cake-type" ? "کیک ها" : ""}
              {location?.pathname.includes("/extra-products")
                ? "لوازم تولد"
                : ""}
              {location?.pathname === "/image-editor-code"
                ? "ویرایش عکس محصول"
                : ""}
            </span>
            <KeyboardBackspace
              style={{ color: "##C36428" }}
              className="cursor-pointer"
              onClick={handleBackNavigatePage}
            />
          </div>
        </div>
        <div className="m-0 p-0 w-100 caro-page mt-3 pt-2">{children}</div>
      </section>
    </>
  );
};

export default BaseLayout;
