import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import Table, {TableData, TableHeader, TableRow} from "./Table";
import SchemaUtils from "../../util/SchemaUtils";

interface Props {
    parameters?: Array<OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject>;
}

/**
 * Renders a list of field and query parameters in table format
 * @constructor
 */
const FieldTable: React.FC<Props> = ({parameters}) => {
    const [descriptionVisible, setDescriptionVisible] = useState(false);

    if (!parameters) {
        return null;
    }

    const rowData = parameters.map((value, index) => {
        const field = SchemaUtils.getFieldProps(value);

        if (!descriptionVisible && field.description) {
            setDescriptionVisible(true);
        }

        // Add optional marker to field that aren't required
        let name = field.name;
        if (!field.required) {
            name += "?";
        }

        return (
            <TableRow key={index}>
                <TableData>
                    {name}
                </TableData>
                <TableData>
                    {field.in}
                </TableData>
                {
                    descriptionVisible && <TableData>{field.description}</TableData>
                }
            </TableRow>
        );
    });

    return (
        <Table>
            <tbody>
            <TableRow header>
                <TableHeader>Parameter</TableHeader>
                <TableHeader>Type</TableHeader>
                {
                    descriptionVisible && <TableHeader>Description</TableHeader>
                }
            </TableRow>
            {rowData}
            </tbody>
        </Table>
    );
};

export default FieldTable;