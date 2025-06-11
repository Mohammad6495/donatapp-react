import React from "react";

import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFavoriteContext } from "../../../../../core/contexts/FavoriteContext/FavoriteContext";
import { useNavigate } from "react-router";

import "./styles.scss";
const FavoriteItem = ({
  id,
  title,
  cakeType,
  image,
  exactWeight,
  tomorowType,
}) => {
  const navigate = useNavigate();
  const { handleRemoveFavorite } = useFavoriteContext();

  const handleNavigateToDetail = () => {
    if (cakeType == 0) {
        navigate(
          "/favorite-refrigerator/" +
            id +
            "/" +
            cakeType +
            "?cakeType=" +
            cakeType
        );
    } else if (cakeType == 1) {
        navigate(`/favorite-tomarrow/${id}/${cakeType}?type=` + tomorowType);
    }
  };
  return (
    <div className="favorite-item d-flex align-items-start position-relative mb-3">
      <IconButton
        onClick={() => handleRemoveFavorite(id, cakeType)}
        sx={{
          position: "absolute",
          right: "0px",
          top: "0px",
        }}
        color="error"
      >
        <CloseIcon />
      </IconButton>
      <div>
        <img className="rounded" width={100} height={100} src={image} />
      </div>
      <div className="d-flex flex-column p-2">
        <span>{title}</span>
        <span>{exactWeight} گرم</span>
      </div>

      <Button
        onClick={handleNavigateToDetail}
        sx={{
          position: "absolute",
          right: "5px",
          bottom: "5px",
        }}
        size="small"
        variant="contained"
        color="primary"
      >
        <span>دیدن جزییات</span>
      </Button>
    </div>
  );
};

export default FavoriteItem;
