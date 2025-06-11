import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { FadeLoader } from "react-spinners";
////////
const RedirectToGateWay = () => {
  const location = useLocation();
  useEffect(() => {
    let url = location.search;
    url = url.replace("?url=", "");
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.click();
  }, [location.search]);

  return (
    <section className="m-0 p-2 flex-grow-1 w-100 d-flex flex-column justify-content-center align-items-center">
      <FadeLoader width={4} height={20} color="#CB7640" />
      <span className="mt-3 fs-6">در حال انتقال به درگاه</span>
    </section>
  );
};

export default RedirectToGateWay;
