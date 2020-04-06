import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import ExpandableContent from "./lib/ExpandableContent";
import AccordionHeader from "./lib/AccordionHeader";
import Words from "./lib/Words";
import BodyView from "./lib/BodyView";
import StatusHelper from "../util/StatusHelper";
import Tabs, {Tab} from "./lib/tabs/Tabs";

interface Props {
    responseBody?: OpenAPIV3.ResponsesObject,
    noTopMargin: boolean
}

const ResponseBodyView: React.FC<Props> = ({responseBody, noTopMargin}) => {
    const [open, setOpen] = useState(true);

    const responses = (responseBody as OpenAPIV3.ResponsesObject);

    const getTabContent = (status: string, value: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject) => {
        const statusValue: OpenAPIV3.ResponseObject = value as OpenAPIV3.ResponseObject;
        const statusContent = statusValue.content;

        if (!statusContent) {
            return (
                <ExpandableContent open={open}>
                    <Words>{StatusHelper.getDescription(status)}</Words>

                    <SyntaxHighlighter language="json" style={monokai}>
                        {"{ }"}
                    </SyntaxHighlighter>
                </ExpandableContent>
            );
        }

        return Object.entries(statusContent).map(([responseType, value]) => {
            if (responseType.toLowerCase().includes("json")) {
                const schema = value.schema as OpenAPIV3.BaseSchemaObject;

                return (
                    <ExpandableContent open={open}>
                        {
                            statusValue.description
                                ? <Words>{statusValue.description}</Words>
                                : <Words>{StatusHelper.getDescription(status)}</Words>
                        }
                        <SyntaxHighlighter language="json" style={monokai}>
                            {
                                JSON.stringify(schema, null, 2)
                            }
                        </SyntaxHighlighter>
                    </ExpandableContent>
                );
            }
        });
    };

    const tabs = Object.entries(responses).map(([key, value], index) =>
        <Tab label={key}>
            {
                getTabContent(key, value)
            }
        </Tab>
    );

    return (
        <BodyView>
            <AccordionHeader open={open}
                             noTopMargin={noTopMargin}
                             onClick={() => setOpen(!open)}
                             labeledChevron>
                Responses
            </AccordionHeader>
            <ExpandableContent open={open}>
                <Tabs>
                    {
                        tabs
                    }
                </Tabs>
            </ExpandableContent>
        </BodyView>
    );
};

export default ResponseBodyView;