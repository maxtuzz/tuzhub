import React, {useEffect, useState} from "react";
import {OpenAPIV3} from "openapi-types";
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import ExpandableContent from "./lib/ExpandableContent";
import AccordionHeader from "./lib/AccordionHeader";
import Words from "./lib/Words";
import BodyView from "./lib/BodyView";
import StatusHelper from "../util/StatusHelper";
import Tab from "./lib/tabs/Tab";
import Tabs from "./lib/tabs/Tabs";

interface Props {
    responseBody?: OpenAPIV3.ResponsesObject,
    noTopMargin: boolean
}

interface TabData {
    status: string
    description?: string
    json: string
}

const ResponseBodyView: React.FC<Props> = ({responseBody, noTopMargin}) => {
    const [open, setOpen] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabData, setTabData] = useState<(TabData | undefined)>(undefined);

    // Show content of first tab by default
    useEffect(() => {
        setTabContentByIndex(0);
    }, []);

    const responses = (responseBody as OpenAPIV3.ResponsesObject);

    const setTabContentByIndex = (index: number) => {
        setActiveIndex(index);

        Object.entries(responses).forEach(([responseKey, response], objectIndex) => {
            if (index === objectIndex) {
                const statusValue: OpenAPIV3.ResponseObject = response as OpenAPIV3.ResponseObject;
                const statusContent = statusValue.content;

                if (!statusContent) {
                    setTabData({
                        status: responseKey,
                        json: ""
                    });

                    return;
                }

                Object.entries(statusContent).forEach(([responseType, value]) => {
                    console.log("response type:" + responseType);

                    if (responseType.toLowerCase().includes("json")) {
                        const schema = value.schema as OpenAPIV3.BaseSchemaObject;

                        setTabData({
                            status: responseKey,
                            description: statusValue.description,
                            json: JSON.stringify(schema, null, 2)
                        })
                    }
                });

                return;
            }
        });
    };

    const tabs = Object.entries(responses).map(([key, value], index) =>
        <Tab isActive={activeIndex === index} onClick={() => setTabContentByIndex(index)}>
            {key}
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
                {
                    tabData?.description
                        ? <Words>{tabData.description}</Words>
                        : <Words>{StatusHelper.getDescription(tabData?.status)}</Words>
                }
                {
                    tabData?.json &&
                    <SyntaxHighlighter language="json" style={monokai}>
                        {
                            tabData.json
                        }
                    </SyntaxHighlighter>
                }
            </ExpandableContent>
        </BodyView>
    );
};

export default ResponseBodyView;