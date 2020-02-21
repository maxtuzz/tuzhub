import React, {useEffect, useState} from "react";
import {OpenAPIV3} from "openapi-types";
import {monokai} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import ExpandableContent from "./lib/ExpandableContent";
import AccordionHeader from "./lib/AccordionHeader";
import styled, {css} from "styled-components";
import Words from "./lib/Words";
import BodyView from "./lib/BodyView";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  border-radius: 2px;
  font-weight: 400;
`;

const TabButton = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 1.2em 2em;
  border-radius: 2px;
  
   ${props => props.active && css`
    border-bottom: 3px solid #51aec0;
  `};
  
  &:hover {
    color: #ffffff;
    cursor: pointer;  
    background: rgba(255, 255, 255, 0.05);
  }
`;

interface Props {
    responseBody?: OpenAPIV3.ResponsesObject,
    noTopMargin: boolean
}

interface TabData {
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
                    setTabData(undefined);

                    return;
                }

                Object.entries(statusContent).forEach(([responseType, value]) => {
                    console.log("response type:" + responseType);

                    if (responseType.toLowerCase().includes("json")) {
                        const schema = value.schema as OpenAPIV3.BaseSchemaObject;

                        setTabData({
                            description: schema.description,
                            json: JSON.stringify(schema, null, 2)
                        })
                    }
                });

                return;
            }
        });
    };

    const tabs = Object.entries(responses).map(([key, value], index) =>
        <TabButton active={activeIndex === index} onClick={() => setTabContentByIndex(index)}>
            {key}
        </TabButton>
    );

    return (
        <BodyView>
            <AccordionHeader open={open}
                             noTopMargin={noTopMargin}
                             onClick={() => setOpen(!open)}>
                Responses
            </AccordionHeader>
            <ExpandableContent open={open}>
                <TabsContainer>
                    {
                        tabs
                    }
                </TabsContainer>
                {
                    tabData?.description && <Words>Test {tabData.description}</Words>
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