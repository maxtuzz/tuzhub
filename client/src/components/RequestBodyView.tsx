import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Words from "./lib/Words";
import styled from "styled-components";
import ExpandableContent from "./lib/ExpandableContent";

const AccordionHeader = styled.h4<{ noTopMargin?: boolean }>`
  margin-top: ${props => props.noTopMargin && 0};
  margin-bottom: 0;
 
  &:hover {
     width: 100%;
     cursor: pointer;
  }
`;


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

    return (
        <div>
            <AccordionHeader noTopMargin={noTopMargin} onClick={() => setOpen(!open)}>Requests</AccordionHeader>
            <ExpandableContent open={open}>
                <SyntaxHighlighter language="json" style={monokai}>
                    {jsonRequest}
                </SyntaxHighlighter>
            </ExpandableContent>
        </div>
    );
};

export default RequestBodyView;