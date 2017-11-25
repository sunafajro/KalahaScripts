import React from "react";
import { bool, func, object, string } from "prop-types";

import { jsUcfirst } from "../utils";

ImageDisplay.propTypes = {
  baseUrl: string.isRequired,
  currentImage: object.isRequired,
  onImageClick: func.isRequired,
  showTerm: bool.isRequired
};

export default function ImageDisplay({ baseUrl, currentImage, onImageClick, showTerm }) {
  return (
    <div className="col-sm-9 text-center" style={{ height: "700px"}}>
      <div style={{ height: "59px", padding: "10px 0" }}>
        { showTerm ? <h1 style={{ margin: 0}}>{ jsUcfirst(currentImage.cv) }</h1> : "" }
      </div>
      <img
        src={baseUrl + "/full/" + currentImage.image + ".jpg" }
        style={{ maxWidth: "700px", maxHeight: "700px" }}
        alt={currentImage.ru}
        onClick={() => {
          onImageClick();
        }}
      />
    </div>
  );
}
