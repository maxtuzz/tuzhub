import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import ExpandableContent from "./lib/ExpandableContent";
import AccordionHeader from "./lib/AccordionHeader";

interface Props {
    responseBody?: OpenAPIV3.ResponsesObject,
    noTopMargin: boolean
}

const ResponseBodyView: React.FC<Props> = ({responseBody, noTopMargin}) => {
    const [open, setOpen] = useState(true);

    return (
        <div>
            <AccordionHeader open={open}
                             noTopMargin={noTopMargin}
                             onClick={() => setOpen(!open)}>
                Responses
            </AccordionHeader>
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