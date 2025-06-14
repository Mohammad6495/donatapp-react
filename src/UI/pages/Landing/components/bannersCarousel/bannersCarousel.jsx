import React, { useState } from "react";
///////// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Pagination, Autoplay, } from "swiper/modules";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.scss";
/////////


const fakeList = [
  {
    id: 0,
    url: "https://demo.caropastry.com/",
    image:
      "https://branch.caropastry.com//banner/e8d734d1-7bd4-49d4-a6fc-b2af783ff9a9.png",
    isAvailable: true,
    isActive: true,
    updatedAt: "2023-03-13T09:33:51.3998639",
    updatedAtFormatted: "1401/12/22 09:33",
    createdAt: "2023-03-13T09:33:51.3998721",
  },
  {
    id: 1,
    url: "https://demo.caropastry.com/",
    image:
      "https://branch.caropastry.com//banner/e8d734d1-7bd4-49d4-a6fc-b2af783ff9a9.png",
    isAvailable: true,
    isActive: true,
    updatedAt: "2023-03-13T09:33:51.3998639",
    updatedAtFormatted: "1401/12/22 09:33",
    createdAt: "2023-03-13T09:33:51.3998721",
  },

  {
    id: 2,
    url: "https://demo.caropastry.com/",
    image:
      "https://branch.caropastry.com//banner/e8d734d1-7bd4-49d4-a6fc-b2af783ff9a9.png",
    isAvailable: true,
    isActive: true,
    updatedAt: "2023-03-13T09:33:51.3998639",
    updatedAtFormatted: "1401/12/22 09:33",
    createdAt: "2023-03-13T09:33:51.3998721",
  },
];

/////////

const BannersCarousel = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const handleNav = (imgData) => {
    if (imgData.url) {
      navigate(imgData.url);
    } else return false;
  };
  ////////
  return (
    <>
      <div className="m-0 p-0 d-block w-100 banners-carousel">
  
      </div>
    </>
  );
};

export default BannersCarousel;
/*


*/
