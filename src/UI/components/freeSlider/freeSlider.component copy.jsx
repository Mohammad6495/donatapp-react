import React, { useState, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import useDrag from "../../../core/custom-hooks/useDrag";

const FreeSlider = (props) => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <div className="scrollBar-width">
      <ScrollMenu
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        scrollContainerClassName=" py-2 d-flex flex-row justify-content-start align-items-stretch"
        itemClassName="d-flex flex-row justify-content-center align-items-stretch me-3 noselect"
      >
        {props.children}
      </ScrollMenu>
    </div>
  );
};

export default FreeSlider;
