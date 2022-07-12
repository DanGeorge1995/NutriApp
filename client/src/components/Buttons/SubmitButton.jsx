import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme }) => theme.button};
  height: 2.1875rem;
  line-height: 2.1875rem;
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.buttonText};
  font-size: 1.1em;
  margin-bottom: 0.625rem;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
  &:focus {
    background: ${({ theme }) => theme.buttonFocus};
  }
`;
const SubmitButton = ({ title, onClick, isForModal }) => {
  return (
    <Button
      className="button"
      type={isForModal ? "button" : "submit"}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default SubmitButton;
