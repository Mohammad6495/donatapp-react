import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import OrdinaryButton from "./../../components/OrdinaryButton/OrdinaryButton";
import useCalcMap from "./components/useSelectDestinationOnMap";
import "./styles/CalculateSendingPrice.scss";
import defMapImg from "../../../assets/images/priceMap.svg";
import BranchTab from "./components/BranchTab";
import { useBranchesContext } from "./../../../core/contexts/BranchesContext/BranchesContext";
import { useLocation } from "react-router";
import SearchMapPlace from "../AddingAddress/SearchMapPlace";
import { locationSearchStringToObject } from "../../../core/utility/utils";
import { useLoadingContext } from "../../../core/contexts/LoadingContext/LoadingContext";
import {
  calcPrice_apiCalls,
  customerAddress_apiCalls,
} from "../../../core/services/agent";
import { apiCaller } from "../../../core/custom-hooks/useApi";

const CalculateSendingPrice = () => {
  // context
  const { allBranches } = useBranchesContext();
  const { handleOpen, handleClose } = useLoadingContext();
  const location = useLocation();
  // states
  const [branchesList, set_branchesList] = useState();
  const [price, setPrice] = useState();
  const [destini, set_destini] = useState();
  const [addressName, setAddressName] = useState("");
  const [currentBranch, setCurrentBranch] = useState();
  const [originPosition, setOriginPosition] = useState();
  //
  useEffect(() => {
    set_branchesList(allBranches);
  }, [allBranches]);
  //////

  //////
  useEffect(() => {
    if (branchesList?.length > 0) {
      if (location.search) {
        const searchObj = locationSearchStringToObject(location.search);
        if (searchObj?.branchId) {
          const branch = branchesList.find((b) => b.id == searchObj?.branchId);
          setCurrentBranch({
            ...branch,
            branchOrigin: [Number(branch?.lat), Number(branch?.lng)],
          });
          setOriginPosition([branch?.lat, branch?.lng]);
          // set_positions([
          //   [Number(searchObj?.branchLat), Number(searchObj?.branchLng)],
          // ]);
        }
      } else {
        setCurrentBranch({
          ...branchesList[0],
          branchOrigin: [
            Number(branchesList[0]?.lat),
            Number(branchesList[0]?.lng),
          ],
        });
        setOriginPosition([branchesList[0]?.lat, branchesList[0]?.lng]);
      }
    }
  }, [location.search, branchesList]);
  // useEffect(() => {
  //   if (branchesList) {
  //     setCurrentBranch({
  //       ...branchesList[0],
  //       branchOrigin: [
  //         Number(branchesList[0]?.lat),
  //         Number(branchesList[0]?.lng),
  //       ],
  //     });
  //     setOriginPosition([branchesList[0]?.lat, branchesList[0]?.lng]);
  //   }
  // }, [branchesList]);

  // Handle Change Tab
  const handleChangeTab = (branchID) => {
    const itemBranch = branchesList.find((item) => item.id === branchID);
    setCurrentBranch({
      ...itemBranch,
      branchOrigin: [Number(itemBranch?.lat), Number(itemBranch?.lng)],
    });
    setOriginPosition([itemBranch?.lat, itemBranch?.lng]);
    onDestinationSelected([itemBranch?.lat, itemBranch?.lng]);
  };

  //User Aoutomatic Location
  function handleLocateUser() {
    navigator?.geolocation?.getCurrentPosition(
      // Success
      (resp) => {
        onDestinationSelected([resp.coords.latitude, resp.coords.longitude]);
      },
      // Error
      (err) => {}
    );
  }

  const getAddressName = (e) => {
    apiCaller({
      api: customerAddress_apiCalls.apiCall_getAddressName,
      apiArguments: { lat: e[0], lng: e[1] },
      // onStart: handleOpen,
      // onEnd: handleClose,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp?.data?.status == 1) {
          /*
             "formatted_address": null,
             "city": null,
             "state": null,
             "route_name": null
           */
          if (resp?.data?.data?.route_name) {
            if (
              resp?.data?.data?.formatted_address.includes(
                resp?.data?.data?.route_name
              )
            ) {
              setAddressName(resp?.data?.data?.formatted_address);
            } else {
              setAddressName(
                resp?.data?.data?.formatted_address +
                  " , " +
                  resp?.data?.data?.route_name
              );
            }
          } else {
            setAddressName(resp?.data?.data?.formatted_address);
          }
        }
      },
    });
  };
  const getCalculatedPrice = () => {
    apiCaller({
      api: calcPrice_apiCalls.apiCall_getCalculatedPrice,
      apiArguments: {
        branchLat: originPosition[0],
        branchLng: originPosition[1],
        destiniLat: destini[0],
        destiniLng: destini[1],
      },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode === 200) {
          setPrice(resp?.data?.data);
        }
      },
      onError: (err) => {},
      onStart: handleOpen,
      onEnd: handleClose,
    });
  };
  ///////// onDestinationSelected //////////
  const onDestinationSelected = (dest) => {
    set_destini(dest);
    getAddressName(dest);
  };

  // const { renderMap, set_positions } = useCalcMap({
  //   originPosition: originPosition,
  //   onDestinationSelected: onDestinationSelected,
  //   draggable: !price ? true : false,
  // });

  // handle calculate price
  const handleCalculatePrice = () => {
    getCalculatedPrice();
  };

  const handleRecalculatePrice = () => {
    set_destini(undefined);
    setPrice(undefined);
    setAddressName("");
  };

  React.useEffect(() => {
    handleRecalculatePrice();
  }, [originPosition]);

  useEffect(() => {
    if (!location.search) {
      handleLocateUser();
    }
  }, []);
 
  return (
    <section className="d-flex flex-column w-100">
      <SearchMapPlace onDestinationSelected={onDestinationSelected} />
      <div className="d-flex flex-column justify-content-start align-items-stretch">
        {/* tab buttons */}
        <div className="d-flex flex-wrap m-0 p-0 gap-2 justify-content-around align-items-center">
          {branchesList &&
            branchesList?.length > 0 &&
            branchesList.map((item) => (
              <div
                key={item?.id}
                className="d-flex justify-content-center align-items-center flex-grow-1 col-6 px-2"
              >
                <Button
                  className="w-100 px-2 py-2"
                  variant={
                    item?.id == currentBranch?.id ? "contained" : "outlined"
                  }
                  color="primary"
                  onClick={() => {
                    handleChangeTab(item?.id);
                  }}
                >
                  {item?.title}
                </Button>
              </div>
            ))}
        </div>
        {/* tab panels */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          {currentBranch && currentBranch?.branchOrigin && (
            <BranchTab
              currentBranch={currentBranch}
              originPosition={currentBranch?.branchOrigin}
              onDestinationSelected={onDestinationSelected}
              handleCalculatePrice={handleCalculatePrice}
              price={price}
              destini={destini}
              handleRecalculatePrice={handleRecalculatePrice}
              addressName={addressName}
            />
          )}
        </div>
        {/* Origin Address */}
      </div>
    </section>
  );
};

export default CalculateSendingPrice;
