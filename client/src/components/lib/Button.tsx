import React from "react";
import styled from "styled-components";
import TinyLoadingSpinner from "../Spinner";

/**
 * Standard configurable button
 */
export const ButtonStyled = styled.button`
  background-color: #51aec0;
  height: 3em;
  color: #FFF;
  font-size: 1em;
  font-weight: 800;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
  
  transition: 0.3s all;
  
  &:hover {
    background-color: #4590a2;
    cursor: pointer;
  }
`;

interface Props {
    children: string
    disabled?: boolean
    isLoading?: boolean
    type?: "button" | "reset" | "submit"
    ref?: any
}

interface Functions {
    onClick?: () => void
}

const Button: React.FC<Props & Functions> = ({onClick, isLoading, children, disabled = false, type = "button", ref}) => (
    <ButtonStyled disabled={disabled} onClick={onClick} type={type} ref={ref}>
        {
            isLoading
                ? <TinyLoadingSpinner/>
                : children
        }
    </ButtonStyled>
);

export default Button;