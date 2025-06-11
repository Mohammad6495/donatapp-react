import { Close, Warning } from "@mui/icons-material";
import { Button, Dialog } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ip_apiCalls } from "../services/agent";
import { apiCaller } from "./useApi";
import { useLocation } from "react-router";
import { locationSearchStringToObject } from "../utility/utils";
import { BsBrowserChrome } from "react-icons/bs";
import headerLogo from '../../assets/images/CaroLogo/headerLogo.png'

const useDetectIp = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const toggleDialog = () => {
    setShowDialog((o) => !o);
  };
  ////
  const [ipData, setIpData] = useState();
  const getIpData = () => {
    apiCaller({
      api: ip_apiCalls.apiCall_getIpData,
      onSuccess: (resp) => {
        if (resp.status === 200) {
          setIpData(resp.data);
          if (resp.data.country.toLowerCase() !== "iran") {
            // toggleDialog();
            setShowDialog(true);
          }
        }
      },
    });
  };
  const spinnerContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    height: "100%",
    width: "100%",
    maxWidth: "576px",
    margin: "0 auto",
    backgroundColor: "#fff",
    zIndex: "10000",
  };

  useEffect(getIpData, []);
  //////////////
  const render = function () {
    return (
      <>
        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
          <div className="p-3 bg-white w-100 h-100">
            <span
              className=" cursor-pointer"
              onClick={() => setShowDialog(false)}
            >
              <Close color="error" />
            </span>
            <div className="mt-3 p-3">
              <Warning className="me-2" color="warning" />
              کاربر گرامی برای عملکرد بهتر برنامه میتوانید vpn خود را خاموش کنید
              .
            </div>
          </div>
        </Dialog>
      </>
    );
  };

  const isOnline = () => {
    return (
      !online && (
        <div className="is-online" style={spinnerContainer}>
          <p className="text-center">
            کاربر گرامی لطفا اینترنت موبایل خود را چک کنید و دوباره تلاش کنید
          </p>
          <div className="m-0 p-3 d-flex flex-row justify-content-center align-items-center">
            <Button
              className="flex-grow-1"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#CB7640" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              بارگذاری مجدد
            </Button>
            <span
              style={{
                width: "1rem",
              }}
            ></span>
          </div>
        </div>
      )
    );
  };

  const CheckLginAsInstagram = () => {
    const [isInstagram, setIsInstagram] = useState(false);

    useEffect(() => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes('instagram')) {
        setIsInstagram(true);
      }
    }, []);

    const openInBrowser = () => {
      const url = window.location.href;
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes('android')) {
        // برای دستگاه‌های اندروید
        window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end;`;
      } else if (ua.includes('iphone') || ua.includes('ipad')) {
        window.location.href = `safari-https:caropastry.ir`;
      } else {
        window.open(url, '_blank');
      }
    };

    const continueInInstagram = () => {
      setIsInstagram(false)
    };

    return (
      isInstagram &&
      <div className="h-100 w-100 p-3" style={{ position: 'fixed', maxWidth: '576px', margin: '0 auto', right: '0', top: '0', left: '0', bottom: '0', zIndex: 1000000000000, backgroundColor: '#fff' }}>
        <h6 className="text-center" style={{ lineHeight: '25px' }}>کاربر گرامی میتوانید از طریق گزینه های زیر وارد وبسایت شوید</h6>
        <div className="mt-5 w-100 d-flex flex-column align-items-center">
          <button onClick={openInBrowser} className="btn btn-warning"> <BsBrowserChrome /> <span>ورود از طریق مرورگر</span></button>
          <button onClick={continueInInstagram} className="btn btn-info mt-4"> متوجه شدم!</button>
          <img src={headerLogo} className="img-fluid mt-5 px-3"/>
        </div>
      </div>
    );
  };
  return { ipData, render, isOnline, CheckLginAsInstagram };
};

export default useDetectIp;
