import React from "react";
import PastryItem, {
  PastryItemsContainer,
} from "../../../CheckoutCart/components/PastryItem/PastryItem";
import { formatPrice } from '../../../../../core/utility/utils'

const CookieItem = ({ boxType, ...item }) => {
  return (
    <div className="d-flex jusify-content-between align-items-stretch w-100 my-2 noselect p-3" style={{ border: '2px solid #CB7640', borderRadius: '10px'}}>
      <div className="d-flex flex-column col-6 h-100 rounded" style={{ border: '1px solid #CB7640'}}>
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
        ) : boxType == 3 ? (
          <PastryItemsContainer>
            {/* boxType == 3 */}
            <PastryItem
              pastryImg={item?.firstRowCookie?.image}
              pastryName={item?.firstRowCookie?.title}
              rowsCount={4}
            />
            <PastryItem
              pastryImg={item?.secondRowCookie?.image}
              pastryName={item?.secondRowCookie?.title}
              rowsCount={4}
            />
            <PastryItem
              pastryImg={item?.thirdRowCookie?.image}
              pastryName={item?.thirdRowCookie?.title}
              rowsCount={4}
            />
            <PastryItem
              pastryImg={item?.fourthRowCookie?.image}
              pastryName={item?.fourthRowCookie?.title}
              rowsCount={4}
            />
          </PastryItemsContainer>
        ) : null}
      </div>
      <div className="d-flex flex-column justify-content-center  align-items-start weight-price-holder col-6 ps-2">
        <span className="pastry-name">جعبه شیرینی</span>
        <span className="pastry-weight my-1 fs-7">
          وزن { item?.weight == 0 ? 'تقریبی' : 'دقیق'} :
          {
            item?.weight != 0 ?
              item?.weight + ' گرم' : boxType == 0
                ? "نیم کیلو"
                : boxType == 1
                  ? "1 کیلو"
                  : boxType == 2
                    ? "2 کیلو"
                    : null
          }
        </span>
        {/* <span>قیمت تقریبی : ۱۰۰,۰۰۰ تومان</span> */}
        <span className="fs-7">قیمت { item?.price == -1 ? 'تقریبی' : 'دقیق'} : {item?.price == -1 ? "نامشخص" : formatPrice(item?.price) + " تومان "}</span>
      </div>
    </div>
  );
};

export default CookieItem;
