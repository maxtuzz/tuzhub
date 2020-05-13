import React from "react";
import styled, {css} from "styled-components";
import TinyLoadingSpinner from "./Spinner";

/**
 * Standard configurable button
 */
const ButtonStyled = styled.button<{ submit?: boolean, disabled?: boolean }>`
  background-color: ${props => props.theme.colors.active};
  height: 3em;
  color: #FFF;
  font-size: 1em;
  font-weight: 800;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
  transition: 0.3s all;
  
  // Submit button styling 
  ${props => props.submit && css`
    width: 95%;
    margin-top: 3em;
  `}
  
  // If disabled, turn off hover effects
  ${props => props.disabled ? css`
    background-color: rgba(81,174,192,0.26);
    color: rgba(255,255,255,0.18);
  `
  : css`
    &:hover {
      background-color: rgba(81,174,192,0.25);
      cursor: pointer;
    }
  `}
`;

interface Props {
    children: string
    disabled?: boolean
    isLoading?: boolean
    submit?: boolean
    ref?: any
}

interface Functions {
    onClick?: () => void
}

const Button: React.FC<Props & Functions> = ({onClick, isLoading, children, disabled = false, submit = false, ref}) => (
    <ButtonStyled disabled={disabled} onClick={onClick} type={submit ? "submit": "button"} ref={ref} submit={submit}>
        {
            isLoading
                ? <TinyLoadingSpinner/>
                : children
        }
    </ButtonStyled>
);

export default Button;