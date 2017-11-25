import React from "react";
import { func, object, string } from "prop-types";

ImageDisplay.propTypes = {
  baseUrl: string.isRequired,
  currentImage: object.isRequired,
  images: object.isRequired,
  onImageSelect: func.isRequired
};

export default function ImageDisplay({ baseUrl, currentImage, images, onImageSelect }) {
  return (
    <div className="col-sm-3 clearfix" style={{ height: "700px", overflowY: "auto" }}>
      { Object.keys(images).map(item => {
        return (
          <div key={ "thmb" + item } className="pull-left">
            { images[item].image ?
            <img
              src={baseUrl + "/thmb/" + images[item].image + ".jpg" }
              className={ currentImage.cv === images[item].cv ? "img-rounded list-of-images list-of-images-selected" : "img-rounded list-of-images" }
              alt={images[item].ru}
              onClick={() => {
                onImageSelect(item);
              }}
            /> : ""}
          </div>
        );
      }) }
    </div>
  );
}
