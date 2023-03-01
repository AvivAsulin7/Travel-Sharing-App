import React from "react";
import { Image } from "cloudinary-react";
import "./Avatar.css";

const Avatar = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <Image
        cloudName="dmobqngyn"
        publicId={props.image}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
