import styled from "styled-components";

/**
 * Standard configurable button
 */
const Button = styled.button<{ primary?: boolean }>`
  /* Adapt the colors based on primary prop */
  background: ${({primary}) => primary ? "palevioletred" : "white"};
  color: ${({primary}) => primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default Button;