import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SubmitButton from "../../components/Buttons/SubmitButton";
import TextContent from "../../components/Texts/TextContent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const stylePage = {
  transform: "translateY(calc(50vh - 50%))",
};

const Welcome = ({ user }) => {
  const navigate = useNavigate(null);
  const toLogin = () => navigate("/login");
  const toRegister = () => navigate("/register");

  // useEffect(() => {
  //   if (user) navigate("/dashboard");
  // }, [user, navigate]);

  return (
    <Container style={stylePage}>
      <Row className="justify-content-center">
        <Col md={5} xs={7} className="py-5 bg-light">
          <Row className="justify-content-center">
            <Col lg={5} className="text-center mb-4">
              <TextContent>Hello :)</TextContent>
            </Col>
            <Col xs={12}></Col>
            <Col lg={5} className="my-1">
              <SubmitButton title="LOGIN" onClick={toLogin} />
            </Col>
            <Col xs={12}></Col>
            <Col lg={5} className="my-1">
              <SubmitButton title="REGISTER" onClick={toRegister} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
