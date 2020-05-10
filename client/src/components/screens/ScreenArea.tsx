import styled from "styled-components";

const ScreenArea = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.backgroundColor}
  flex-direction: column;
  color: white;
  padding: 20px 90px 20px 50px;
  font-family: "Roboto", sans-serif;
  overflow-y: auto;
`;

export default ScreenArea;