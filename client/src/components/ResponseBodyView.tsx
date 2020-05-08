import React, {useState} from "react";
import {OpenAPIV3} from "openapi-types";
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import ExpandableContent from "./lib/ExpandableContent";
import AccordionHeader from "./lib/AccordionHeader";
import Words from "./lib/Words";
import BodyView from "./lib/BodyView";
import Tabs, {Tab} from "./lib/tabs/Tabs";
import StatusHelper from "../util/StatusHelper";
import PropertyTable from "./lib/PropertyTable";

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

        const statusDescription = statusValue.description
            ? <Words>{statusValue.description}</Words>
            : <Words>{StatusHelper.getDescription(status)}</Words>;

        const style = monokai;

        if (!statusContent) {
            return (
                <ExpandableContent open={open}>
                    {statusDescription}

                    <SyntaxHighlighter language="json" style={style} customStyle={{background: 0}}>
                        {"{}"}
                    </SyntaxHighlighter>
                </ExpandableContent>
            );

        }

        // Todo: Accept multiple format types (responseType)
        return Object.entries(statusContent).map(([responseType, mediaType]) => {
            const schema = mediaType.schema as OpenAPIV3.BaseSchemaObject;
            const codeSnippet = JSON.stringify(schema, null, 2);

            return (
                <ExpandableContent open={open} key={responseType}>
                    {statusDescription}
                    {/*<SyntaxHighlighter language="json" style={style} customStyle={{background: 0}}>*/}
                    {/*    {*/}
                    {/*        codeSnippet*/}
                    {/*    }*/}
                    {/*</SyntaxHighlighter>*/}
                    <PropertyTable schema={schema}/>
                </ExpandableContent>
            );
        });
    };

    const tabs = Object.entries(responses).map(([key, value]) =>
        <Tab label={key} key={key}>
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