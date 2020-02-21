import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Words from "./lib/Words";
import ExpandableContent from "./lib/ExpandableContent";
import AccordionHeader from "./lib/AccordionHeader";
import BodyView from "./lib/BodyView";

interface Props {
    requestBody?: OpenAPIV3.RequestBodyObject,
    noTopMargin: boolean
}

const RequestBodyView: React.FC<Props> = ({requestBody, noTopMargin}) => {
    const [jsonRequest, setJsonRequest] = useState("");
    const [open, setOpen] = useState(true);

    if (!requestBody) {
        return <Words>Please define request body as a parameter</Words>
    }

    // Only support JSON at this time
    Object.entries(requestBody.content).forEach(([key, resource]) => {
        if (key.toLowerCase().includes("json") && jsonRequest === "") {
            const schema = resource.schema as OpenAPIV3.BaseSchemaObject;

            setJsonRequest(JSON.stringify(schema.properties, null, 2));
        }
    });

    const headerTitle = `Requests ${requestBody.required ? "(required)" : ""}`;

    return (
        <BodyView>
            <AccordionHeader open={open}
                             noTopMargin={noTopMargin}
                             onClick={() => setOpen(!open)}>
                {headerTitle}
            </AccordionHeader>
            <ExpandableContent open={open}>
                <SyntaxHighlighter language="json" style={monokai}>
                    {jsonRequest ? jsonRequest : "{}"}
                </SyntaxHighlighter>
            </ExpandableContent>
        </BodyView>
    );
};

export default RequestBodyView;