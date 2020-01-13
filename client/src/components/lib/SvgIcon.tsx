import styled from "styled-components";

const SvgIcon = styled.svg<{ size?: number }>`
    width: ${({size}) => size ? size + "px" : 20 + "px"};
    height: ${({size}) => size ? size + "px" : 20 + "px"};
`;

export default SvgIcon;