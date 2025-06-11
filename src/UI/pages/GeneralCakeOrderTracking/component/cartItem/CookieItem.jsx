import React from "react";
import PastryItem, {
  PastryItemsContainer,
} from "../../../CheckoutCart/components/PastryItem/PastryItem";

const CookieItem = ({ boxType, ...item }) => {
  return (
    <div className="d-flex jusify-content-between align-items-stretch w-100 my-2 noselect">
      <div className="d-flex flex-column border border-1 col-6 h-100">
        {boxType == 0 ? (
          <PastryItemsContainer>
            {/* boxType == 0 */}
            <PastryItem
              pastryImg={item?.firstRowCookie?.image}
              pastryName={item?.firstRowCookie?.title}
              rowsCount={2}
            />
            <PastryItem
              pastryImg={item?.secondRowCookie?.image}
              pastryName={item?.secondRowCookie?.title}
              rowsCount={2}
            />
          </PastryItemsContainer>
        ) : boxType == 1 ? (
          <PastryItemsContainer>
            {/* boxType == 1 */}
            <PastryItem
              pastryImg={item?.firstRowCookie?.image}
              pastryName={item?.firstRowCookie?.title}
              rowsCount={3}
            />
            <PastryItem
              pastryImg={item?.secondRowCookie?.image}
              pastryName={item?.secondRowCookie?.title}
              rowsCount={3}
            />
            <PastryItem
              pastryImg={item?.thirdRowCookie?.image}
              pastryName={item?.thirdRowCookie?.title}
              rowsCount={3}
            />
          </PastryItemsContainer>
        ) : boxType == 2 ? (
          <PastryItemsContainer>
            {/* boxType == 2 */}
            <PastryItem
              pastryImg={item?.firstRowCookie?.image}
              pastryName={item?.firstRowCookie?.title}
              rowsCount={5}
            />
            <PastryItem
              pastryImg={item?.secondRowCookie?.image}
              pastryName={item?.secondRowCookie?.title}
              rowsCount={5}
            />
            <PastryItem
              pastryImg={item?.thirdRowCookie?.image}
              pastryName={item?.thirdRowCookie?.title}
              rowsCount={5}
            />
            <PastryItem
              pastryImg={item?.fourthRowCookie?.image}
              pastryName={item?.fourthRowCookie?.title}
              rowsCount={5}
            />
            <PastryItem
              pastryImg={item?.fifthRowCookie?.image}
              pastryName={item?.fifthRowCookie?.title}
              rowsCount={5}
            />
          </PastryItemsContainer>
        ) : null}
      </div>
      <div className="d-flex flex-column justify-content-center gap-3 align-items-start weight-price-holder col-6 ps-2">
        <span className="pastry-name">جعبه شیرینی</span>
        <span className="pastry-weight">
          وزن تقریبی :
          {boxType == 0
            ? "نیم کیلو"
            : boxType == 1
            ? "1 کیلو"
            : boxType == 2
            ? "2 کیلو"
            : null}
        </span>
        {/* <span>قیمت تقریبی : ۱۰۰,۰۰۰ تومان</span> */}
        <span>قیمت تقریبی : نامشخص</span>
      </div>
    </div>
  );
};

export default CookieItem;
