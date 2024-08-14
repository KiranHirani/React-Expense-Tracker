import React, { useState } from "react";
import Popup from "./Popup";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const onClose = () => {
    setShowPopup(false);
  };

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
              onClick={() => setShowPopup(true)}
            ></i>
          </h1>
        </div>
      </div>
      <div>{showPopup && <Popup onClose={onClose} />}</div>
    </div>
  );
};

export default Header;
