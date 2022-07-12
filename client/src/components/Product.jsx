import React from "react";

const Product = ({ product_id: id, name, image }) => {
  const toBase64 = (arr) => {
    arr = new Uint8Array(arr); // if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <>
      <span>{name}</span>

      {/* <img
        // src={`data:image/png;base64,${image.toString("base64")}`}
        src={toBase64(image.data)}
        alt="profile"
      /> */}
    </>
  );
};

export default Product;
