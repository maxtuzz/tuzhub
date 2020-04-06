import React, {useState} from "react";
import HeaderText from "./lib/HeaderText";
import Words from "./lib/Words";
import SwitchToggle from "./lib/SwitchToggle";
import AccordionHeader from "./lib/AccordionHeader";
import styled from "styled-components";
import Input from "./lib/Input";
import ExpandableContent from "./lib/ExpandableContent";
import Button from "./lib/Button";
import SectionHeader from "./lib/SectionHeader";
import FadeInContent from "./lib/FadeInContent";
import Tabs, {Tab} from "./lib/tabs/Tabs";

const FormContainer = styled(FadeInContent)`
  display: flex;
  flex-direction: column;
  width: 70%; 
  
  @media (max-width: 1126px) {
      width: 100%;
  }
`;

const Form = styled.form`
  margin-top: 1em;
  margin-bottom: 2em;
  border-radius: 5px;
`;

const FormInput = styled(Input)<{ invalid?: boolean }>`
  margin-bottom: 1em;
  
  border-bottom: ${props => props.invalid && "1px solid red"};
`;

interface FormContent {
    displayName: string
    description: string
    specUrl: string
    dynamicConf: boolean
}

const ApiForm: React.FC = ({}) => {
    const [expandAdvancedSettings, setExpandAdvancedSettings] = useState(false);

    const [formContent, setFormContent] = useState<FormContent>({
        displayName: "",
        description: "",
        specUrl: "",
        dynamicConf: true
    });

    return (
        <FormContainer>
            <Form>
                <HeaderText>Add API</HeaderText>
                <Words>Enter in some basic details about the API you want to link</Words>
                <FormInput type="text" placeholder="Display name" onChange={event => setFormContent({
                    ...formContent,
                    displayName: event.target.value
                })}/>
                <FormInput type="text" placeholder="Summary" onChange={event => setFormContent({
                    ...formContent,
                    description: event.target.value
                })}/>

                <HeaderText>Spec</HeaderText>
                <Words>You can either choose to link a spec directly and let Tuzzy take care of polling it for changes.
                    Or you can upload it directly.</Words>
                <Words>Multiple specs can be assigned to an API after creation (versions, pre-release demos
                    etc.)</Words>

                <Tabs>
                    <Tab label="Remote">
                        <Words>Provide an URL to remote spec</Words>
                        <FormInput onChange={event => setFormContent({
                            ...formContent,
                            specUrl: event.target.value
                        })}
                                   type="text"
                                   placeholder="https://raw.githubusercontent.com/maxtuzz/tuzzy-dev-portal/master/server/src/test/resources/specs/petstore.yaml"
                        />
                    </Tab>
                    <Tab label="Upload">
                        <span>world</span>
                    </Tab>
                </Tabs>

                <SectionHeader>Auto configure</SectionHeader>
                <SwitchToggle onChange={(event) => setFormContent({
                    ...formContent,
                    dynamicConf: event.target.checked
                })}/>

                <AccordionHeader open={expandAdvancedSettings}
                                 onClick={() => setExpandAdvancedSettings(!expandAdvancedSettings)}>
                    Advanced settings
                </AccordionHeader>
                <ExpandableContent open={expandAdvancedSettings}>
                    <Words>Coming soon. (Disable proxy, authentication, etc.)</Words>
                </ExpandableContent>
            </Form>
            <Button onClick={() => alert(JSON.stringify(formContent))}>Create</Button>
        </FormContainer>
    );
};

export default ApiForm;
