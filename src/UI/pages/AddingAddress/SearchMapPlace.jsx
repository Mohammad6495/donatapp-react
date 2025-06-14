import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";

import { RiMapPin2Fill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";

import "./styles/SearchMapPlace.scss";
import { IconButton } from "@mui/material";
import { useBranchesContext } from "../../../core/contexts/BranchesContext/BranchesContext";

const API_KEY = "service.3829cd76b65640cca59de05ec21a6b40";
const urlSearch = "https://api.neshan.org/v1/search";

const SearchMapPlace = ({ onDestinationSelected }) => {
  const searchRef = useRef(null);
  const location = useLocation();
  const [searchPlaceValue, setSearchPlaceValue] = useState("");
  const [findPlaceList, setFindPlaceList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { branch } = useBranchesContext()

  const changeSearchValueHandle = (e) => {
    setSearchPlaceValue(e.target.value);
  };

  const fetchApiSeachPlaceList = async () => {
    setSearchLoading(true);
    const res = await fetch(
      `${urlSearch}?term=${searchPlaceValue} ${'مازندران'}&lat=0&lng=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      }
    );
    const data = await res.json();
    setFindPlaceList(data?.items);
    setSearchLoading(false);
  };
 
  // useEffect(() => {
  //   if (location.pathname == "/add-address") {
  //     searchRef.current.focus();
  //   }
  // }, []);

  useEffect(() => {
    if (searchPlaceValue) {
      fetchApiSeachPlaceList();
    }
  }, [searchPlaceValue]);

  const handleDes = (location) => {
    if (findPlaceList?.length !== 0) {
      if (onDestinationSelected) {
        onDestinationSelected([location?.y, location?.x]);
        setSearchPlaceValue("");
      }
    }
  };

  return (
    <div className="search-place my-3">
      <form
        className="form-group position-relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="w-100"
          onChange={changeSearchValueHandle}
          value={searchPlaceValue}
          style={{ border: "1px solid #8D8D8D", borderRadius: "7px 0 7px 7px" }}
          ref={searchRef}
          placeholder="جستجو مکان مورد نظر..."
        />
        {searchPlaceValue && (
          <IconButton
            style={{
              position: "absolute",
              left: "0",
              top: "1px",
              fontSize: "20px",
            }}
            onClick={() => setSearchPlaceValue("")}
          >
            <IoCloseCircle />
          </IconButton>
        )}
      </form>
      {searchPlaceValue && (
        <div className="search-place-box">
          {searchLoading ? (
            <p className="mt-2">لطفا صبر کنید...</p>
          ) : (
            <ul>
              {findPlaceList?.map((item, indx) => (
                <div
                  key={indx}
                  style={{ borderBottom: "1px solid rgb(148, 4, 107)" }}
                  className="d-flex align-items-center justify-content-start"
                >
                  <span>
                    <RiMapPin2Fill fontSize={18} color="rgb(148, 4, 107)" />
                  </span>
                  <li
                    className="py-3 mx-1"
                    onClick={() => handleDes(item?.location)}
                  >
                    {item?.title}
                    {
                      item?.region &&
                      <span> , {item?.region}</span>
                    }
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMapPlace;
