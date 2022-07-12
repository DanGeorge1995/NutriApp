import React from "react";
import styled from "styled-components";

const Text = styled.span`
  font-size: 1.25rem;
  letter-spacing: 0.1rem;
`;

const TextContent = ({ children }) => {
  return <Text>{children}</Text>;
};

export default TextContent;
