import styled from "styled-components";

const Href = styled.a`
  color: ${props => props.theme.colors.words};
  
  &:hover {
    color: ${props => props.theme.colors.active};
    font-weight: 400;
  }
`;

export default Href;