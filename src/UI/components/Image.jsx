import React, { useState, useId } from "react";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import ProgressiveGracefulImage from "react-progressive-graceful-image";

/////////////////
export const ImageComponent = ({
  id,
  src = "",
  style = {},
  imageDefaultClassName = "",
  placeHolderSx = {},
}) => {
  const uid = useId();
  const [imageNotLoaded, setImageNotLoaded] = useState(false);
  const onImageNotLoaded = (e) => {
    setImageNotLoaded(true);
  };
  return (
    <>
      <ProgressiveGracefulImage
        src={src}
        onError={onImageNotLoaded}
        alt="NO_PIC"
      >
        {(src, loading) => (
          <img
            src={src}
            alt="NO_PIC"
            className={`rounded ${loading
                ? `before-img-product`
                : `img-fluid w-100 after-img-product`
              }`}
            style={{
              filter: `blur(${loading ? "15px" : "0px"})`,
              transition: "filter 1000ms",
            }}
          />
        )}
      </ProgressiveGracefulImage>
      <span
        id={"img_" + id ?? uid}
        className={(!imageNotLoaded ? "d-none" : "") + " "}
      >
        <ImageNotSupportedIcon htmlColor="#CB764073" sx={placeHolderSx} />
      </span>
    </>
  );
};
