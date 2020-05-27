import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import RefFinder from "../../util/RefFinder";
import Modal from "./Modal";
import SchemaUtils from "../../util/SchemaUtils";
import {monokai} from "react-syntax-highlighter/dist/esm/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import Table, {TableData, TableHeader, TableRow} from "./Table";

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

    // Doesn't pass schema validation
    if (!SchemaUtils.isSchema(schema)) {
        return <></>;
    }

    // Schema has no properties to show
    const properties = SchemaUtils.getSchemaProps(schema);
    if (!properties) {
        return <></>;
    }

    const rowData = properties.map(([key, contents], index) => {
        let fieldName = key;
        let fieldContent = SchemaUtils.getSchema(contents);

        if (schema.required && schema.required.includes(fieldName)) {
            fieldName += "?";
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
            setModalProps({
                content: fieldContent,
                open: true,
                title: type
            })
        };

        return (
            <TableRow key={index} onClickCapture={onClickCapture} clickable>
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
                    <div>
                        <PropertyTable schema={modalProps.content} components={components}/>
                        {
                            schema.example &&
                            <SyntaxHighlighter language="json" style={monokai} customStyle={{background: 0}}>
                                {
                                    JSON.stringify(schema.example, null, 2)
                                }
                            </SyntaxHighlighter>
                        }
                    </div>
                </Modal>
            }
            <Table>
                <tbody>
                <TableRow header>
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