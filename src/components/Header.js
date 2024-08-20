import React, { useState } from "react";
import Popup from "./Popup";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handlePopupToggle = () => setShowPopup((prev) => !prev);

  return (
    <div className="header">
      <div className="content">
        <h2 className="heading">
          PennyWise <i className="fa-solid fa-piggy-bank"></i>
        </h2>
        <div>
          <h1>
            <i
              className="fa-solid fa-plus me-4 float-end text-white"
              onClick={handlePopupToggle}
            ></i>
          </h1>
        </div>
      </div>
      <div>{showPopup && <Popup onClose={handlePopupToggle} />}</div>
    </div>
  );
};

export default Header;
