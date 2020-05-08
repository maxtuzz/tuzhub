import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import Words from "./lib/Words";
import ExpandableContent from "./lib/ExpandableContent";
import AccordionHeader from "./lib/AccordionHeader";
import BodyView from "./lib/BodyView";
import PropertyTable from "./lib/PropertyTable";

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
    const [open, setOpen] = useState(true);

    if (!requestBody) {
        return <Words>Please define request body as a parameter</Words>
    }

    const headerTitle = `Requests ${requestBody.required ? "(required)" : ""}`;

    // Todo: Support multiple schema requests
    const firstSchema = Object.entries(requestBody.content).map(([key, resource]) => {
        return resource.schema as OpenAPIV3.BaseSchemaObject
    })[0];

    if (!firstSchema) {
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
                <PropertyTable schema={firstSchema}/>
            </ExpandableContent>
        </BodyView>
    );
};

export default RequestBodyView;