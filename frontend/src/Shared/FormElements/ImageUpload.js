import React, { useRef, useEffect, useState } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const imageUploadRef = useRef();

  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  const pickedHandler = (event) => {
    let pickedImage;
    let imageIsValid = isValid;
    if (event.target.files && event.target.files.length == 1) {
      pickedImage = event.target.files[0];
      setImage(pickedImage);
      setIsValid(true);
      imageIsValid = true;
    } else {
      setIsValid(false);
      imageIsValid = false;
    }
    props.onInput(props.id, pickedImage, imageIsValid);
  };

  const pickImageHandler = () => {
    imageUploadRef.current.click(); // open up the file picker
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={imageUploadRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please upload an image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Upload Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
