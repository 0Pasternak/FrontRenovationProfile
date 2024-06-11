import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
import "./styles/cardModel.css";

function CardModel({ onClose, children }) {
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-modal-container">
          <GrClose className="close-button" onClick={onClose} />
        </div>
        <div className="moda-info-content">{children}</div>
      </div>
    </div>
  );
}

CardModel.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CardModel;
