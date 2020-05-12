import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import Words from "./lib/Words";
import ExpandableContent from "./lib/ExpandableContent";
import AccordionHeader from "./lib/AccordionHeader";
import BodyView from "./lib/BodyView";
import PropertyTableContainer from "../containers/PropertyTableContainer";

interface Props {
    requestBody?: OpenAPIV3.RequestBodyObject,
    noTopMargin: boolean
}

/**
 * Request body review renders request schemas in tabular form
 * For 99% of usecases, we can just render the first item, however we will need to support multiples requests
 * @param requestBody
 * @param noTopMargin
 * @constructor
 */
const RequestBodyView: React.FC<Props> = ({requestBody, noTopMargin}) => {
    const [schema, setSchema] = useState<OpenAPIV3.SchemaObject | null>();
    const [open, setOpen] = useState(true);

    if (!requestBody || !requestBody.content) {
        return <Words>Please define request body as a parameter</Words>
    }

    const headerTitle = `Requests ${requestBody.required ? "(required)" : ""}`;

    Object.entries(requestBody.content).forEach(([key, resource]) => {
        if (key.toLowerCase().includes("json") && !schema) {
            setSchema(resource.schema as OpenAPIV3.SchemaObject);
        }
    });

    if (!schema) {
        return <></>;
    }

    return (
        <BodyView>
            <AccordionHeader open={open}
                             noTopMargin={noTopMargin}
                             onClick={() => setOpen(!open)}
                             labeledChevron>
                {headerTitle}
            </AccordionHeader>
            <ExpandableContent open={open}>
                <PropertyTableContainer schema={schema}/>
            </ExpandableContent>
        </BodyView>
    );
};

export default RequestBodyView;