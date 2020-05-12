import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import styled, {css} from "styled-components";
import RefFinder from "../../util/RefFinder";
import Modal from "./Modal";
import SchemaUtils from "../../util/SchemaUtils";

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

const Table = styled.table`
  background: black;
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
  
  ${TableRow}:last-child {
    border-radius: 0 0 6px 0;
  }
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
    content?: OpenAPIV3.BaseSchemaObject
}

/**
 * Renders a table from schema
 * @constructor
 */
const PropertyTable: React.FC<Props> = ({schema, components}) => {
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<OpenAPIV3.SchemaObject | undefined>(undefined);
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const properties = SchemaUtils.getSchemaProps(schema);

    if (!properties) {
        return <></>;
    }

    const rowData = properties.map(([key, contents], index) => {
        let fieldName = key;
        const fieldContent = contents as OpenAPIV3.SchemaObject;

        if (fieldContent.nullable) {
            fieldName += "?";
        }

        const description = fieldContent.description;

        if (description) {
            setDescriptionVisible(true);
        }

        let type: string = fieldContent.type;

        // If component references is includes, look up type in list
        if (components) {
            if (type === "object" || type === "array") {
                type = RefFinder.find(fieldContent, components);
            }
        }

        const onClickCapture = () => {
            /**
             * Todo: Compose these into single object
             */
            setModalOpen(true);
            setModalTitle(type);
            setModalContent(fieldContent);
        };

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
                modalOpen &&
                <Modal open={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)}>
                    <PropertyTable schema={modalContent}/>
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