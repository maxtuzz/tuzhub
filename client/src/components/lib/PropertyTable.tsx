import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import styled, {css} from "styled-components";

const TableContainer = styled.div`
  //background: black;
`;

const TableRow = styled.tr<{ header?: boolean, index: number }>`
   background-color: ${props => props.theme.colors.sidebarColor};
   transition: all 0.3s ease-in;
     
   &:hover {
    background-color: rgba(81,174,192,0.72);
    cursor: pointer;
   }
  
  ${props => props.index % 2 !== 0 && css`
   background-color: ${props.theme.colors.sidebarColor};
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
  
  ${TableRow}:last-child {
    border-radius: 0 0 6px 0;
  }
`;

const SchemaHeader = styled.div`
  padding: 0.9em;
  background: ${props => props.theme.colors.secondary};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const TableData = styled.td`
  padding: 0.7em;
   border: none;
`;

const TableHeader = styled.th`
  padding: 0.7em;
`;

interface Props {
    schema: OpenAPIV3.BaseSchemaObject
}

/**
 * Renders a table from schema
 * @constructor
 */
const PropertyTable: React.FC<Props> = ({schema}) => {
    const [descriptionVisible, setDescriptionVisble] = useState(false);
    const properties = schema.properties

    if (!properties) {
        return <></>;
    }

    const rowData = Object.entries(properties).map(([key, contents], index) => {
        let fieldName = key;
        const fieldContent = contents as OpenAPIV3.SchemaObject;

        if (fieldContent.nullable) {
            fieldName += "?";
        }

        const description = fieldContent.description;

        if (description) {
            setDescriptionVisble(true);
        }

        return (
            <TableRow key={index} index={index}>
                <TableData>
                    {fieldName}
                </TableData>
                <TableData>
                    {fieldContent.type}
                </TableData>
                {
                    descriptionVisible && <TableData>{description}</TableData>
                }
            </TableRow>
        );
    });

    return (
        <TableContainer>
            <Table>
                <TableRow header index={0}>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    {
                        descriptionVisible && <TableHeader>Description</TableHeader>
                    }
                </TableRow>
                {rowData}
            </Table>
        </TableContainer>
    )
};

export default PropertyTable;