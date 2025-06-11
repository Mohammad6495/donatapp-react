import React, { useEffect, useState } from "react";
import {
  newfakeDataServiceColomnOne,
  newfakeDataServiceColomnTwo,
} from "./utils/fakeServicesData";
import "./styles.scss";
import { useNavigate } from "react-router";
import { Skeleton } from "@mui/material";

const LandingServices = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const itemClickHandler = (path) => {
   navigate(path)
  };


  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 px-3 pv-2 mt-2 mb-3">
      <div className="d-flex justify-content-between align-items-between flex-wrap w-100">
      <div className="d-flex flex-wrap w-100">
          
            <div className="col-6">
              {loading ? (
                [0, 1].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rectangular"
                    className="rounded  mb-2"
                    style={{
                      width: "100%",
                      paddingTop: item === 0 ? "140%" : "80%",
                      boxSizing: "border-box",
                    }}
                  />
                ))
              ) : (
                <>
                  {newfakeDataServiceColomnOne.map((item) => (
                    <div
                      onClick={() => itemClickHandler(item?.path)}
                      key={item?.id}
                    >
                      <img
                        
                        
                        src={item?.image}
                        className="img-fluid p-2"
                      />
                      {/* )} */}
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="col-6">
              {loading &&
                [0, 1, 2].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rectangular"
                    className="rounded ms-2 mb-2"
                    style={{
                      width: "95%",
                      paddingTop: "72%", // نسبت ابعادی مطابق با تصویر
                      boxSizing: "border-box",
                    }}
                  />
                ))}
              {!loading && (
                <>
                  {newfakeDataServiceColomnTwo.map((item) => (
                    <div
                      onClick={() => itemClickHandler(item?.path)}
                      key={item?.id}
                    >
                      <img
                       
                        src={item?.image}
                        className="img-fluid p-2 "
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default LandingServices;
