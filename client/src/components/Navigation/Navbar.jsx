import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import LogoutBtn from "../Buttons/LogoutBtn";

const Nav = styled.nav`
  box-shadow: 0px -5px 18px 13px #0f00ff;
  ul {
    list-style-type: none;
    font-size: 1.5rem;
    & li {
      padding: 1rem 2rem;
      & a {
        color: ${({ theme }) => theme.text};
        text-decoration: none;
      }
    }
    .brand {
      color: #00ff00;
    }
    /* button {
      padding: 1rem 2rem;
    } */
  }
`;

const MainNavbar = () => {
  return (
    <Nav>
      <ul className="d-flex justify-content-between">
        <div style={{ display: "flex" }}>
          <li className="brand">NutriApp</li>
        </div>
        <Row className="g-0">
          <Col xs="auto">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </Col>
          <Col xs="auto">
            <li>
              <Link to="/products">Products</Link>
            </li>
          </Col>
          <Col xs="auto">
            <li>
              <Link to="/create-plan">Create plan</Link>
            </li>
          </Col>
          <Col xs="auto">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </Col>
          <Col xs="auto">
            <li>
              <LogoutBtn title="Log out" />
            </li>
          </Col>
        </Row>
      </ul>
    </Nav>
  );
};

export default MainNavbar;
