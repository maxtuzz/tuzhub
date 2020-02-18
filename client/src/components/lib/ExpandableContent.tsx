import styled from "styled-components";

export const ExpandableContent = styled.div<{ open: boolean }>`
  opacity: ${props => (props.open ? "1" : "0")};
  max-height: ${props => (props.open ? `auto` : "0")};
  overflow: hidden;
  padding: ${props => (props.open ? "5px 5px" : "0 5px")};
  transition: all 0.3s;
`;

export default ExpandableContent;