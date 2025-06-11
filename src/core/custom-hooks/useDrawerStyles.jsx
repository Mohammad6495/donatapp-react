import { useWindowDimensions } from "./getWindowDimensions";
import makeStyles from "@mui/styles/makeStyles";

const useCaculateLeft = () => {
  const { width } = useWindowDimensions();

  if (width <= 576) {
    return "0px";
  } else return "calc((100vw - 576px)/2)";
};
const useCaculateRight = () => {
  const { width } = useWindowDimensions();

  if (width <= 576) {
    return "0px";
  } else return "calc((100vw - 576px)/2)";
};

export const useLeftDrawerStyles = () => {
  return {
    sx: {
      maxWidth: "576px",
      margin: "0 auto",
      overflow: "hidden",
      "& .MuiBackdrop-root": {
        top: "env(safe-area-inset-top)",
        maxWidth: "576px",
        margin: "0 auto",
      },
      "& .MuiDrawer-paper": {
        top: "env(safe-area-inset-top)",
        left: useCaculateLeft(),
      },
    },
  };
  // return makeStyles({
  //   root: {
  //     maxWidth: "576px",
  //     margin: "0 auto",
  //     overflow: "hidden",
  //     "& .MuiBackdrop-root": {
  //       maxWidth: "576px",
  //       margin: "0 auto",
  //     },
  //     "& .MuiDrawer-paper": {
  //       left: useCaculateLeft(),
  //     },
  //   },
  // })();
};

export const useRightDrawerStyles = () => {
  // return makeStyles({
  //     root: {
  //         maxWidth: "576px",
  //         margin: "0 auto",
  //         overflow: "hidden",
  //         "& .MuiBackdrop-root": {
  //             maxWidth: "576px",
  //             margin: "0 auto",
  //         },
  //         "& .MuiDrawer-paper": {
  //             // position: "absolute"
  //             right: useCaculateRight()
  //         }
  //     },

  // })();
  return {
    sx: {
      maxWidth: "576px",
      margin: "0 auto",
      overflow: "hidden",
      "& .MuiBackdrop-root": {
        top: "env(safe-area-inset-top)",
        maxWidth: "576px",
        margin: "0 auto",
      },
      "& .MuiDrawer-paper": {
        top: "env(safe-area-inset-top)",
        // position: "absolute"
        right: useCaculateRight(),
      },
    },
  };
};
