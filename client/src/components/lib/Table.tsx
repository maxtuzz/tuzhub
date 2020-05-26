import styled, {css} from "styled-components";

const TableData = styled.td`
   padding: 0.7em;
   border: none;
`;

const TableHeader = styled.th`
  padding: 0.7em;
`;

const TableRow = styled.tr<{ header?: boolean, clickable?: boolean }>`
   background-color: ${props => props.theme.colors.sidebarColor};
     
  ${props => props.clickable && css`
    &:hover {
      background-color: rgba(81,174,192,0.72);
      cursor: pointer;
    }
  `} 
   
  ${props => props.header && css`
    background-color: #202225;
      &:hover {
        background-color: #202225;
      }
  `}
`;

const Table = styled.table`
  background: black;
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`;
export default Table;

export {
    TableData,
    TableHeader,
    TableRow
}
