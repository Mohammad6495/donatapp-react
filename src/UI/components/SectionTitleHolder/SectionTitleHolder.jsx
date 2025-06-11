import React from "react";

const SectionTitleHolder = ({
  titleText,
  titleFontSize = "1rem",
  titleColor = "#444444",
  parentClasses = "my-2",
}) => {
  return (
    <div
      className={`d-flex justify-content-start align-items-center w-100 ${parentClasses}`}
    >
      <span style={{ fontSize: titleFontSize, color: titleColor }}>
        {titleText}
      </span>
    </div>
  );
};

export default SectionTitleHolder;
