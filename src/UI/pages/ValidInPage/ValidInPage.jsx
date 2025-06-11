import { Warning } from "@mui/icons-material";
import courseImg from "../../../assets/images/courseOpenBrowser1.png";
import courseImg2 from "../../../assets/images/courseOpenBrowser2.png";
import andriodTest1Img from "../../../assets/images/andriodTest.jpg";
import andriodTest2Img from "../../../assets/images/andriodTest2.jpg";
import headerLogo from "../../../assets/images/CaroLogo/headerLogo.png";
import { Alert, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { locationSearchStringToObject } from "../../../core/utility/utils";
import { useAuthContext } from "../../../core/contexts/AuthContext/AuthContext";
import http from "../../../core/services/http";

const ValidInPage = () => {
  const { set_validIn, validIn } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAndriod, setIsAndriod] = useState(false);

  useEffect(() => {
    const qo = locationSearchStringToObject(location?.search ?? "");
    if (qo?.device?.includes("android")) {
      setIsAndriod(true);
    }
    if (qo?.device?.includes("ios")) {
      setIsAndriod(false);
    }
  }, [location?.search]);

  useEffect(() => {
    if (!document.referrer.includes("instagram.com")) {
      navigate("/?pageId=0");
    }
  }, []);

  const handleNavigateToHomePage = () => {
    http.setToken(http.validInInstagram, "0");
    set_validIn("0");
    setTimeout(() => {
      navigate("/?pageId=0");
    }, 500);
  };


  const handleSubmitToBrowser = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('android')) {
      window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end;`;
    }
  }

  return (
    <div className="w-100 d-flex flex-column h-100 p-3 position-relative" style={{ height: "100vh", backgroundColor: '#fff' }}>
      {isAndriod ? (
        <>
          <div className="p-3 bg-white w-100 d-flex flex-column align-items-center h-100">
            <div>
              <Warning className="me-2" color="warning" />
              <span className="fs-7">
                کار بر گرامی برای عملکرد بهتر سایت را در مرورگر خود باز کنید
              </span>
            </div>
            <hr className="w-100"/>
            <img className="w-75" src={headerLogo}/>
            <hr className="w-100"/>
            <Button
              onClick={handleSubmitToBrowser}
              variant="contained"
              color="primary"
              className="w-100 my-3"
            >
              <span>باز شدن در مرورگر</span>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="p-3 bg-white w-100 h-100" >
            <div>
              <Warning className="me-2" color="warning" />
              <span className="fs-7">
                کاربر گرامی لطفا برای عملکرد بهتر برنامه VPN خود را خاموش کنید
              </span>
            </div>
            <hr />
            <div className="d-flex flex-column w-100">
              <span className="fs-7">
                کاربر عزیز لطفا از طریق مرور گر خود وارد وبسایت شوید :
              </span>
              <div className="my-2">
                <span className="fw-bold">مرحله اول :</span>
                <img src={courseImg} className="w-100 h-100 mt-2 rounded" />
              </div>
              <div className="">
                <span className="fw-bold">مرحله دوم :</span>
                <img src={courseImg2} className="w-100 h-100 mt-2 rounded" />
              </div>
            </div>
          </div>
          <Button
            onClick={handleNavigateToHomePage}
            variant="contained"
            color="primary"
            className="w-100"
            style={{
              position: 'fixed',
              bottom: '5px',
              right: '0',
              left: '0'
            }}
          >
            <span>متوجه شدم!</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default ValidInPage;
