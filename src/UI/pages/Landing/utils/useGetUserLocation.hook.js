import React, { useState, useEffect } from "react";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { branches_apiCalls } from "../../../../core/services/agent";

export const useGetUserLocation = () => {
  const [userHasLocation, setUserHasLocation] = useState();
  const [userLatLng, setUserLatLng] = useState({ lat: "", lng: "" });
  const [userClosestBranch, setUserClosestBranch] = useState();

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition(
      // Success
      (resp) => {
        setUserHasLocation(true);
      },
      // Error
      (err) => {
        setUserHasLocation(false);
      }
    );
  }, []);

  useEffect(() => {
    if (userHasLocation) {
      apiCaller({
        api: branches_apiCalls.apiCall_getClosestBranch,
        apiArguments: userLatLng,
        onSuccess: (resp) => {
          setUserClosestBranch(resp?.data?.data);
        },
        onError: (err) => {},
      });
    }
  }, [userHasLocation]);

  return { userHasLocation, userClosestBranch };
};
