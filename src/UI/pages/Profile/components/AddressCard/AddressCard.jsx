import React from "react";
import defImg from "../../../../../assets/images/map-address.svg";
import "./styles/AddressCard.scss";
import { useNavigate } from "react-router";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";

const AddressCard = ({
  addressId,
  lat,
  long,
  addressMapImg = defImg,
  addressMapText = "",
  addressMapPostalCode = "",
  handleSetDefaultAddress,
  handleDeleteAddress,
  isDefault = false,
}) => {
  const navigate = useNavigate();

  const handleNavigateToEditAddress = (id) => {
    navigate(`/edit-address/${id}`);
  };

  const handlePin = (e) => {
    e.stopPropagation();
    if (isDefault) return;
    handleSetDefaultAddress(addressId);
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteAddress(addressId);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
      onClick={() => handleNavigateToEditAddress(addressId)}
      className="d-flex justify-content-start align-items-stretch address-card-holder my-2 cursor-pointer"
    >
      <div className="d-flex justify-content-center align-items-center col-3">
        <div className="d-flex justify-content-center align-items-center w-100 p-2">
          <img className="w-100" src={addressMapImg} alt="NO_PIC" />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between align-items-start col-9 gap-1 p-2 address-card-text-holder">
        <span className="address-card-text">آدرس : </span>
        <span>{addressMapText}</span>
      </div>
      <div
        className="d-flex flex-row justify-content-center align-items-start"
        style={{ position: "absolute", top: "0.5rem", left: "0.5rem" }}
      >
        <DeleteIcon
          style={{ fontSize: "1.25rem" }}
          onClick={handleDelete}
          color="error"
        />
        <PushPinIcon
          onClick={handlePin}
          color="primary"
          style={
            isDefault
              ? {
                  transform: "rotateZ(-45deg)",
                }
              : {}
          }
        />
      </div>
    </div>
  );
};

export default AddressCard;
