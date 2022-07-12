import React from "react";
import ProductRow from "./ProductRow";
import "./header-table.css";
import styled from "styled-components";

const HeaderText = styled.th`
  color: ${({ theme }) => theme.tableTextColor};
`;

const ProductsTable = ({ products, handleDeleteProd, handleOpenEditModal }) => {
  console.log(products);
  return (
    <>
      <table className="table">
        <thead className="d-none d-md-table-header-group">
          <tr>
            <HeaderText className="d-sm-none d-md-table-cell">
              Product
            </HeaderText>
            <HeaderText className="d-sm-none d-md-table-cell">
              Category
            </HeaderText>
            <HeaderText className="d-sm-none d-md-table-cell">
              Calories
            </HeaderText>
            <HeaderText className="d-sm-none d-md-table-cell">
              Quantity
            </HeaderText>
            <HeaderText className="d-sm-none d-md-table-cell">
              Protein
            </HeaderText>
            <HeaderText className="d-sm-none d-md-table-cell">Carbs</HeaderText>
            <HeaderText className="d-sm-none d-md-table-cell">Fats</HeaderText>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <ProductRow
                key={index}
                handleDeleteProd={handleDeleteProd}
                handleOpenEditModal={handleOpenEditModal}
                {...product}
              />
            );
          })}
        </tbody>
      </table>

      {/* {products.map((prod, index) => (
        <ProductRow key={index} {...prod} />
      ))} */}
    </>
  );
};

export default ProductsTable;
