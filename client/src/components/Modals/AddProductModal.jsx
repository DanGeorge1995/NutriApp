import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ProductForm from "../Forms/ProductForm";
import { createProduct } from "../../axios/requests";

const AddProductModal = (props) => {
  const { show, onHide, requestFunction, title } = props;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ background: "red" }}>
        <ProductForm
          title={title}
          isLoading={isLoading}
          requestFunction={requestFunction}
        />

        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
