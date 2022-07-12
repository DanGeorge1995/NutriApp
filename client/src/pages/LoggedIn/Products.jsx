// Style
import { Col, Container, Row } from "react-bootstrap";

// React
import React, { useCallback } from "react";
import { useEffect, useState } from "react";

// Components
import SubmitButton from "../../components/Buttons/SubmitButton";
import AddProductModal from "../../components/Modals/AddProductModal";
import PageLayout from "../Layouts/PageLayout";
import ProductsTable from "../../components/Tables/ProductsTable";

// Requests
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../axios/requests";

const Products = ({ user }) => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [products, setProducts] = useState([]);

  const handleOpenAddModal = () => {
    setAddModalShow(true);
  };

  const handleOpenEditModal = () => {
    setEditModalShow(true);
  };

  const getProd = useCallback(async (id) => {
    const res = await getProducts(id);
    try {
      if (res && !res.isAxiosError) {
        setProducts(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createProd = useCallback(
    async (
      name,
      category,
      image,
      quantity,
      um,
      calories,
      protein,
      fat,
      carbs
    ) => {
      const res = await createProduct(
        user.id,
        name,
        category,
        image,
        quantity,
        um,
        calories,
        protein,
        fat,
        carbs
      );
      try {
        if (res && !res.isAxiosError) {
          setAddModalShow(false);
          getProd(user.id);
          console.log("Success !!!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const updateProd = useCallback(
    async (
      product_id,
      name,
      category,
      image,
      quantity,
      um,
      calories,
      protein,
      fat,
      carbs
    ) => {
      const res = await createProduct(
        product_id,
        name,
        category,
        image,
        quantity,
        um,
        calories,
        protein,
        fat,
        carbs
      );
      try {
        if (res && !res.isAxiosError) {
          setEditModalShow(false);
          getProd(user.id);
          console.log("Success !!!");
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const deleteProd = async (product_id) => {
    const res = await deleteProduct(product_id);
    try {
      if (res && !res.isAxiosError) {
        getProd(user.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProd(user.id);
  }, [getProd, user.id]);

  return (
    <PageLayout>
      <Container className="mt-5">
        <Row>
          <Col xs={2}>
            <SubmitButton
              title="Add product"
              onClick={handleOpenAddModal}
              isForModal={true}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ProductsTable
              products={products}
              handleDeleteProd={deleteProd}
              handleOpenEditModal={handleOpenEditModal}
            />
          </Col>
        </Row>
      </Container>
      {/* Modals */}
      {/* Add */}
      <AddProductModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
        requestFunction={createProd}
        title="Add Product"
      />
      {/* Edit */}
      <AddProductModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        requestFunction={updateProd}
        title="Edit Product"
      />
    </PageLayout>
  );
};

export default Products;
