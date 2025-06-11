import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import http from "../../../../../core/services/http";
import "./styles/ProfileLinksItem.scss";
import { useProfileContext } from "../../../../../core/contexts/UserProfileContext/UserProfileContext";
import { useAuthContext } from "../../../../../core/contexts/AuthContext/AuthContext";
import { useShopBasketContext } from "../../../../../core/contexts/ShopBasket/shopBasket.ctx";

const ProfileLinksItem = ({
  linkId,
  linkTitle,
  linkcon,
  linkPath,
  isLogged,
  handleDrawerClicked,
}) => {
  const navigate = useNavigate();
  const location = useLocation()
  const { userData, set_userData } = useProfileContext();
  const { userToken, set_userToken } = useAuthContext();
  const { resetBasket } = useShopBasketContext();
  const handleRedirect = () => {
    if (linkPath) {
      navigate(linkPath);
    }
  };



  // handleLogOutUser
  const handleLogOutUser = () => {
    http.removeToken(http.tokenKey);
    resetBasket();
    set_userData(undefined);
    set_userToken("");
    handleDrawerClicked();
    window.location.reload();
  };

  if (isLogged && linkPath === "/register") return <></>;
  if (!isLogged && linkTitle === "خروج") return <></>;

  return (
    <Link
      to={linkPath}
      onClick={linkId === "8" ? handleLogOutUser : () => {}}
      className="d-flex justify-content-between align-items-center profile-links-item-holder py-2"
    >
      <div className="d-flex icon-title-holder align-items-center">
        <img width={35} height={35} src={linkcon} alt="icon" className="cursor-pointer" />
        <span
          className="mx-2 cursor-pointer"
          style={{ fontSize: "14px", fontWeight: "bold" }}
        >
          {linkTitle}
        </span>
      </div>
      <div className="icon-back-space-holder cursor-pointer">
        <KeyboardBackspace
          htmlColor="#CB7640"
          onClick={linkId == 8 ? handleLogOutUser : handleRedirect}
        />
      </div>
    </Link>
  );
};

export default ProfileLinksItem;
