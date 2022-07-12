import React from "react";
import styled from "styled-components";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

const BodyText = styled.td`
  color: ${({ theme }) => theme.tableTextColor};
`;

const ProductRow = (props) => {
  const {
    product_id: id,
    name,
    category,
    calories,
    quantity,
    um,
    protein,
    carbs,
    fat,
    image,
    handleDeleteProd,
    handleOpenEditModal,
  } = props;
  const toBase64 = (arr) => {
    arr = new Uint8Array(arr); // if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  return (
    <>
      <tr>
        <BodyText className="d-none d-md-table-cell">{name}</BodyText>
        <BodyText className="d-none d-md-table-cell">{category}</BodyText>
        <BodyText className="d-none d-md-table-cell">{calories}</BodyText>
        <BodyText className="d-none d-md-table-cell">{`${quantity} ${um}`}</BodyText>
        <BodyText className="d-none d-md-table-cell">{protein}g</BodyText>
        <BodyText className="d-none d-md-table-cell">{carbs}g</BodyText>
        <BodyText className="d-none d-md-table-cell">{fat}g</BodyText>
        <BodyText className="d-none d-md-table-cell">
          <BsFillPencilFill cursor={"pointer"} onClick={handleOpenEditModal} />
        </BodyText>
        <BodyText className="d-none d-md-table-cell">
          <BsFillTrashFill
            cursor={"pointer"}
            onClick={() => handleDeleteProd(id)}
          />
        </BodyText>
        {/* <td className="d-md-none d-table-cell">
          <div className="card">
            <div className="card-body">
              <strong className="card-title">Product</strong>
              <p className="card-text">
                Category
                <br />
                Calories
                <br />
                Quantity
                <br />
                Protein
                <br />
                Fats
                <br />
                Carbs
              </p>
              <button className="btn btn-secondary btn-block">Action</button>
            </div>
          </div>
        </td> */}
      </tr>
      {/* <img
        // src={`data:image/png;base64,${image.toString("base64")}`}
        src={toBase64(image.data)}
        alt="profile"
      /> */}
    </>
  );
};

export default ProductRow;
