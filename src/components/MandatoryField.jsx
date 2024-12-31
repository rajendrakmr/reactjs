import React from 'react';

const MandatoryField = ({
  noticeText = "(*) Indicates Mandatory Fields.",
  containerClass = "align-items-center px-4 mx-auto text-bold text-end position-relative",
  textClass = "text-danger mandatorField",
}) => {
  return (
    <div className={containerClass}>
      <span className={textClass}>{noticeText}</span>
    </div>
  );
};

export default MandatoryField;
