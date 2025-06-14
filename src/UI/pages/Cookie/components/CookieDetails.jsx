import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../../core/contexts/AuthContext/AuthContext";
import { useCookiesContext } from "../../../../core/contexts/CookiesContext/CookiesContext";
import { useCreamyCookiesContext } from "../../../../core/contexts/CreamyCookiesContext/CreamyCookiesContext";
import { useShopBasketContext } from "../../../../core/contexts/ShopBasket/shopBasket.ctx";
import OrdinaryButton, {
  OutlinedButton,
  SimpleButton,
} from "../../../components/OrdinaryButton/OrdinaryButton";
import useNotRegisteredModal from "../../../components/useNotRegisteredModal";
import PastryItem, {
  PastryItemsContainer,
} from "./../../CheckoutCart/components/PastryItem/PastryItem";
import CookieDetailsItem from "./components/CookieDetailsItem";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { branches_apiCalls } from "../../../../core/services/agent";
import { useLoadingContext } from "../../../../core/contexts/LoadingContext/LoadingContext";
import { toast } from "react-toastify";

const CookieDetails = () => {
  const {
    boxRows,
    createBoxRows,
    handleDeleteCookieItem,
    boxRowCount,
    boxSizeNumber,
  } = useCookiesContext();

  const { handleClose, handleOpen } = useLoadingContext();
  const { cookieProducts_methods, shopBasketData } = useShopBasketContext();
  const navigate = useNavigate();

  const onBoxRowDelete = (id) => {
    cookieProducts_methods.deleteItem(
      cookieProducts_methods.createItem(boxRows)
    );
    handleDeleteCookieItem(id);
  };
  const [shouldGoToBasket, setShouldGoToBasket] = useState(false);
  const [isAvailability, setIsAvailability] = useState({});

  const { userToken } = useAuthContext();
  const {
    handleClose: handleCloseAlertModal,
    handleOpen: handleOpenAlertModal,
    render: renderAlertModal,
  } = useNotRegisteredModal({ intialOpenState: false });

  const handleNavigateToCheckOutCart = () => {
    // if (cookieProducts_methods.doesExistsInBasket(boxRows)) {
    //   navigate('/checkout-cart');
    // } else {

    if (isAvailability.isAvailableBasicCookie) {
      cookieProducts_methods.createAndAddItem(boxRows);
      setShouldGoToBasket(true);
    } else {
      toast.warn(isAvailability.basicCookieDescription);
    }
    // }
  };

  useEffect(() => {
    if (shouldGoToBasket) {
      // let doesBoxExist = cookieProducts_methods.doesExistsInBasket(boxRows);
      // if (!doesBoxExist) return;
      // else {
      createBoxRows(boxRowCount);
      navigate("/checkout-cart");
      // }
    }
  }, [shouldGoToBasket]);
  ///////////////

  useEffect(() => {
    if (boxRows?.length == 0) {
      navigate(-1);
    }
  }, []);
  ///

  const handleNavigateToBack = () => {
    navigate(-1);
  };

  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 p-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      {renderAlertModal()}
      <div className="w-100">
        {/* boxes */}
        <div className="d-flex jusify-content-between align-items-stretch w-100 my-2">
          <div className="d-flex flex-column  border-1 col-6 h-100">
            <PastryItemsContainer>
              {boxRows &&
                boxRows?.map((it, indx) => (
                  <PastryItem
                    key={indx}
                    pastryId={it?.cookie?.id}
                    pastryImg={it?.cookie?.image}
                    pastryName={it?.cookie?.title}
                    handleDelete={onBoxRowDelete}
                    rowsCount={boxRows?.length}
                  />
                ))}
            </PastryItemsContainer>
          </div>
          <div className="d-flex flex-column justify-content-center gap-3 align-items-start box-type-holder  ps-5">
            <span className="box-name">
              <span>جعبه {boxSizeNumber} کیلویی</span>
            </span>
            {/* <span className="row-count">
              <span>تعداد انتخاب : </span>
              <span>{boxRowCount} ردیف</span>
            </span> */}
          </div>
        </div>
        {/*  */}
        <div
          className="d-flex flex-column jusify-content-center align-items-stretch"
          style={{ marginBottom: "80px" }}
        >
          {boxRows
            ?.filter((it) => it?.cookie !== null)
            .map((item, indx) => (
              <CookieDetailsItem
                key={item?.cookie?.id}
                itemSelectNumber={indx}
                itemId={item?.cookie?.id}
                itemName={item?.cookie?.title}
                itemImg={item?.cookie?.image}
                handleDeletingItem={onBoxRowDelete}
                index={indx}
              />
            ))}
        </div>
        <div style={{ maxWidth: "576px" }} className="buttons-holder">
          <div
            style={{
              position: "fixed",
              bottom: "5px",
              width: "100%",
              margin: "0 auto",
              left: "0",
              padding: "10px",
              right: "0",
              maxWidth: "576px",
            }}
          >
            <OrdinaryButton
              handleOnClick={handleNavigateToCheckOutCart}
              buttonText={
                // cookieProducts_methods?.doesExistsInBasket(boxRows)
                //   ? "رفتن به سبد خرید"
                //   :
                "افزودن به سبد خرید"
              }
              holderClasses="my-1"
            />
            <div style={{ backgroundColor: "#fff", borderRadius: "5px" }}>
              <SimpleButton
                handleOnClick={handleNavigateToBack}
                buttonText="بازگشت و تغییر در سفارش"
                holderClasses="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookieDetails;
