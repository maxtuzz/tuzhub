import React, {useState} from "react";

import styled from "styled-components";
import TabButton from "./TabButton";

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  border-radius: 2px;
  font-weight: 400;
`;

export const Tab = styled.div<{ label: string }>``;

interface Props {
    children: any
}

const Tabs: React.FC<Props> = ({children}) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    return (
        <div>
            <TabsContainer>
                {
                    children.map((tab: JSX.Element, index: number) => {
                        const label = tab.props.label;

                        return <TabButton key={index}
                                          label={label}
                                          isActive={activeTab === label}
                                          onClick={() => setActiveTab(label)}/>
                    })
                }
            </TabsContainer>

            <div>
                {children.map((tab: JSX.Element) => {
                    if (tab.props.label !== activeTab) return undefined;

                    return tab.props.children;
                })}
            </div>
        </div>
    );
};

export default Tabs;