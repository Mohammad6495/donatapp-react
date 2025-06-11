import React from "react";
import { Close, Done } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { refrigeratorCakeSortingDrawerItemData } from "./utils/RefrigeratorCakeSortingDrawerItemData";

const RefrigeratorCakeSortingDrawer = ({
  sortingDrawerIsOpen,
  sortingCurrentItem,
  sortingDrawerCloseHandler,
  sortingDrawerClickHandler,
  sortingDrawerItemClickHandler,
}) => {
  return (
    <>
      <Drawer
        PaperProps={{
          sx: { maxWidth: "576px", margin: "0 auto", overflow: "hidden" },
        }}
        // {...leftDrawerClasses}
        // dir="rtl"
        anchor="bottom"
        open={sortingDrawerIsOpen}
        onClose={sortingDrawerClickHandler}
      >
        <div className="d-flex flex-column w-100 h-100 py-3 px-2">
          <div className="d-flex justify-content-between align-items-center w-100 my-2">
            <span className="fs-bold text-caro-primary me-1">
              مرتب سازی بر اساس
            </span>
            <Close
              htmlColor="#CB7640"
              onClick={sortingDrawerCloseHandler}
              className="cursor-pointer"
            />
          </div>
          {refrigeratorCakeSortingDrawerItemData?.map((item) => (
            <div
              onClick={() => sortingDrawerItemClickHandler(item?.id)}
              key={item?.id}
              className="d-flex justify-content-between align-items-center w-100 border-bottom py-2 cursor-pointer"
            >
              <span>{item?.text}</span>
              {sortingCurrentItem && sortingCurrentItem[0]?.id == item?.id ? (
                <Done />
              ) : null}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default RefrigeratorCakeSortingDrawer;
