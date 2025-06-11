import React, { useState, useEffect } from "react";
///////// API
import { apiCaller } from "../../../../../core/custom-hooks/useApi";
import { branches_apiCalls } from "../../../../../core/services/agent";
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
  const [bannersList, setBannersList] = useState("");

  const [loading, setLoading] = useState(false)
  const getBanner = () => {
    apiCaller({
      api: branches_apiCalls.apiCall_getMainPageBanners,
      onSuccess: (resp) => {
        if (resp.status === 200 && resp.data?.status == 1)
          setBannersList(resp.data.data);
      },
      onStart: () => setLoading(true),
      onEnd: () => setLoading(false)
    });
  };
  useEffect(() => {
    getBanner();
  }, []);
  const handleNav = (imgData) => {
    if (imgData.url) {
      navigate(imgData.url);
    } else return false;
  };
  ////////
  return (
    <>
      <div className="m-0 p-0 d-block w-100 banners-carousel">
        {
          loading ?
            <Skeleton variant="rectangular" className="mx-auto  my-2 rounded" width="90%">
              <div style={{ paddingTop: '57%' }} />
            </Skeleton>
            :
            <Swiper
              style={{ cursor: "pointer" }}
              // install Swiper modules
              spaceBetween={50}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination]}
            >
              {bannersList?.length > 0 &&
                bannersList?.map((imgData, index) => (
                  <SwiperSlide
                    key={imgData.id}
                    className="d-flex justify-content-center"
                  >
                    <LazyLoadImage
                      onClick={() => {
                        handleNav(imgData);
                      }}
                      alt="NO_PIC"
                      // placeholder={<Skeleton variant="rectangular" width={"70%"} />}
                      src={imgData.image}
                      style={{ width: "100%" }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>

        }
      </div>
      {bannersList?.length > 0 && <div className="mb-3"></div>}
    </>
  );
};

export default BannersCarousel;
/*


*/
