import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { apiCaller } from "../../../../core/custom-hooks/useApi";
import { useLoadingContext } from "../../../../core/contexts/LoadingContext/LoadingContext";
import { Alert } from "@mui/material";
import { account_apiCalls } from "../../../../core/services/agent";
import http from "../../../../core/services/http";
import { useAuthContext } from "../../../../core/contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";

const OrderDetailsCheckVerifyNumber = () => {
  const navigate = useNavigate();
  const { id, number, code } = useParams();
  const { handleOpen, handleClose } = useLoadingContext();
  const { set_userToken } = useAuthContext();
  const { userToken } = useAuthContext();

  useEffect(() => {
    apiCaller({
      api: account_apiCalls.apiCall_verifyRegisterUser,
      apiArguments: { code: code, phoneNumber: number },
      onStart: handleOpen,
      onEnd: handleClose,
      onError: (err) => {
        toast.error(" عملیات با خطا مواجه شد .");
        navigate("/?pageId=0");
      },
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data.statusCode == 200) {
          if (userToken) {
            navigate(`/general-order-details/${id}`, {
              state: {number},
            });
          } else {
            set_userToken(resp.data.data);
            http.setToken(http.tokenKey, resp.data.data);
            navigate(`/general-order-details/${id}`, {
              state: {number},
            });
          }
        }
      },
    });
  }, [id, number, code]);

  ///////states
  return (
    <div>
      <Alert severity="warning">
        در حال انتقال به صفحه مورد نظر لطفا صبر کنید...
      </Alert>
    </div>
  );
};

export default OrderDetailsCheckVerifyNumber;
