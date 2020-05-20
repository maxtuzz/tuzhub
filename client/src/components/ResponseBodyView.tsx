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
import PropertyTableContainer from "../containers/PropertyTableContainer";
import SectionHeader from "./lib/SectionHeader";
import SchemaUtils from "../util/SchemaUtils";
import Markdown from "./lib/Markdown";

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
            ? <Markdown source={statusValue.description}/>
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
            const schema = SchemaUtils.getSchema(mediaType.schema);

            return (
                <ExpandableContent open={open} key={responseType}>
                    {statusDescription}
                    {schema.properties && <SectionHeader>Properties</SectionHeader>}
                    <PropertyTableContainer schema={schema}/>
                    {
                        mediaType.example &&
                        <div>
                            <SectionHeader>Example</SectionHeader>
                            <SyntaxHighlighter language="json" style={monokai}
                                               customStyle={{background: 0, width: "100%", overflowX: "hidden"}}
                                               wrapLines={true}>
                                {
                                    JSON.stringify(mediaType.example, null, 2)
                                }
                            </SyntaxHighlighter>
                        </div>
                    }
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