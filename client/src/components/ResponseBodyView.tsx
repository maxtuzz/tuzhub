import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
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
    responseBody?: OpenAPIV3.ResponsesObject,
    noTopMargin: boolean
}

const ResponseBodyView: React.FC<Props> = ({responseBody, noTopMargin}) => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <AccordionHeader noTopMargin={noTopMargin} onClick={() => setOpen(!open)}>Responses</AccordionHeader>
            <ExpandableContent open={open}>
                <SyntaxHighlighter language="json" style={monokai}>
                    {
                        JSON.stringify(responseBody, null, 2)
                    }
                </SyntaxHighlighter>
            </ExpandableContent>
        </div>
    );
};

export default ResponseBodyView;