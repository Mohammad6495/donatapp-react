import { useLocation, useNavigate } from "react-router";
import { apiCaller } from "../custom-hooks/useApi";
import { account_apiCalls } from "../services/agent";
import { useLoadingContext } from "./../contexts/LoadingContext/LoadingContext";
import { toast } from "react-toastify";
import { locationSearchStringToObject } from "./utils";

export const useCheckProfileStatus = () => {
  ////
  const { handleClose, handleOpen } = useLoadingContext();
  const navigate = useNavigate();
  const location = useLocation();
  ////

  const checkProfileStatus = ({
    onContinueAllowed = () => {},
    onStart = () => {},
    onEnd = () => {},
    onContinueNotAllowed = () => {},
    onError = () => {},
  }) => {
    apiCaller({
      api: account_apiCalls.apiCall_getUserProfile,
      onError: onError,
      onSuccess: (resp) => {
        if (resp?.data?.statusCode == 200 && resp?.status == 200) {
          if (!resp?.data?.data?.firstName) {
            onContinueNotAllowed();
            if (!location.pathname.includes("verify-register")) {
              navigate(`/edit-profile?returnUrl=${location.pathname}`);
              return;
            }
            if (location.pathname.includes("verify-register")) {
              if (location.search.includes("returnUrl")) {
                navigate(
                  `/edit-profile?returnUrl=${
                    locationSearchStringToObject(location.search).returnUrl
                  }`
                );
                return;
              }

              navigate(`/edit-profile`);
              return;
            }
          }
          if (resp?.data?.data?.address?.length === 0) {
            onContinueNotAllowed();
            if (
              !location.pathname.includes("verify-register") &&
              !location.pathname.includes("edit-profile")
            ) {
              navigate(`/add-address?returnUrl=${location.pathname}`);
              return;
            }
            if (
              location.pathname.includes("verify-register") ||
              location.pathname.includes("edit-profile")
            ) {
              if (location.search.includes("returnUrl")) {
                navigate(
                  `/add-address?returnUrl=${
                    locationSearchStringToObject(window.location.search)
                      .returnUrl
                  }`
                );
                return;
              }
              navigate(`/add-address`);
              return;
            }
          }
          if (
            resp?.data?.data?.firstName &&
            resp?.data?.data?.address?.length !== 0
          ) {
            onContinueAllowed();
          }
        } else {
          toast.error("بررسی اطلاعات کاربر با خطا مواجه شد");
        }
      },
      toastMessage: true,
      onErrorMessage: "بررسی اطلاعات کاربر با خطا مواجه شد",
      onStart: onStart,
      onEnd: onEnd,
    });
  };

  return { checkProfileStatus };
};
