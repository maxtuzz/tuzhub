import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import styled, {css} from "styled-components";
import RefFinder from "../../util/RefFinder";
import Modal from "./Modal";
import SchemaUtils from "../../util/SchemaUtils";

const Table = styled.table`
  background: black;
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`;

const TableRow = styled.tr<{ header?: boolean, index: number }>`
   background-color: ${props => props.theme.colors.sidebarColor};
     
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

const TableData = styled.td`
  padding: 0.7em;
   border: none;
`;

const TableHeader = styled.th`
  padding: 0.7em;
`;

interface Props {
    schema?: OpenAPIV3.SchemaObject
    components?: OpenAPIV3.ComponentsObject
}

interface ModalProps {
    title: string
    open: boolean
    content?: OpenAPIV3.SchemaObject
}

/**
 * Renders a table from schema
 * @constructor
 */
const PropertyTable: React.FC<Props> = ({schema, components}) => {
    const [modalProps, setModalProps] = useState<ModalProps>({
        title: "",
        open: false,
        content: undefined
    });
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const properties = SchemaUtils.getSchemaProps(schema);

    if (!properties) {
        return <></>;
    }

    const rowData = properties.map(([key, contents], index) => {
        let fieldName = key;
        let fieldContent = SchemaUtils.getSchema(contents);

        if (fieldContent.required) {
            if (fieldContent.required.includes(fieldName)) {
                fieldName += "?";
            }
        }

        const description = fieldContent.description;

        if (description && !descriptionVisible) {
            setDescriptionVisible(true);
        }

        let type: string = fieldContent.type;

        // If component references is included, look up type in list
        if (components) {
            if (type === "object" || type === "array") {
                type = RefFinder.find(fieldContent, components);
                console.log("HELLOOOOOO");

                // Array can have properties outside of items tag, if they aren't linked to a reference.
                // This method gets whatever is supplied be in under schema.properties or schema.items.properties
                if (SchemaUtils.isArray(fieldContent)) {
                    const arraySchema = SchemaUtils.getArraySchema(fieldContent);

                    // Set field content to whichever has properties field
                    if (arraySchema) fieldContent = arraySchema
                }
            }
        }

        if (fieldContent.format) {
            type += ` (${fieldContent.format})`;
        }

        const onClickCapture = () => {
            console.log(JSON.stringify(fieldContent));
            setModalProps({
                content: fieldContent,
                open: true,
                title: type
            })
        };

        console.log("NOW TO RENDER");

        return (
            <TableRow key={index} index={index} onClickCapture={onClickCapture}>
                <TableData>
                    {fieldName}
                </TableData>
                <TableData>
                    {type}
                </TableData>
                {
                    descriptionVisible && <TableData>{description}</TableData>
                }
            </TableRow>
        );
    });

    return (
        <div>
            {
                modalProps.open &&
                <Modal open={modalProps.open} title={modalProps.title}
                       onClose={() => setModalProps({...modalProps, open: false})}>
                    <PropertyTable schema={modalProps.content} components={components}/>
                </Modal>
            }
            <Table>
                <tbody>
                <TableRow header index={0}>
                    <TableHeader>Field</TableHeader>
                    <TableHeader>Type</TableHeader>
                    {
                        descriptionVisible && <TableHeader>Description</TableHeader>
                    }
                </TableRow>
                {rowData}
                </tbody>
            </Table>
        </div>
    )
};

export default PropertyTable;