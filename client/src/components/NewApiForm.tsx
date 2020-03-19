import React, {useState} from "react";
import HeaderText from "./lib/HeaderText";
import Words from "./lib/Words";
import Tabs from "./lib/tabs/Tabs";
import Tab from "./lib/tabs/Tab";
import SwitchToggle from "./lib/SwitchToggle";
import AccordionHeader from "./lib/AccordionHeader";
import styled from "styled-components";
import Input from "./lib/Input";
import ExpandableContent from "./lib/ExpandableContent";
import Button from "./lib/Button";
import SectionHeader from "./lib/SectionHeader";
import FadeInContent from "./lib/FadeInContent";

const FormContainer = styled(FadeInContent)`
  display: flex;
  flex-direction: column;
  width: 70%; 
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

interface Props {

}

const NewApiForm: React.FC<Props> = ({}) => {
    const [expandAdvancedSettings, setExpandAdvancedSettings] = useState(false);
    return (
        <FormContainer>
            <Form>
                <HeaderText>Add API</HeaderText>
                <Words>Enter in some basic details about the API you want to link</Words>
                <FormInput type="text" placeholder="Display name"/>
                <FormInput type="text" placeholder="Summary"/>

                <HeaderText>Spec</HeaderText>
                <Words>You can either choose to link a spec directly and let Tuzzy take care of polling it for changes.
                    Or you can upload it directly.</Words>
                <Words>Multiple specs can be assigned to an API after creation (versions, pre-release demos
                    etc.)</Words>

                <Tabs>
                    <Tab onClick={() => console.log("spec")} isActive={true}>Remote</Tab>
                    <Tab onClick={() => console.log("spec")} isActive={false}>Upload</Tab>
                </Tabs>
                <Words>Provide an URL to remote spec</Words>
                <FormInput type="text"
                           placeholder="https://raw.githubusercontent.com/maxtuzz/tuzzy-dev-portal/master/server/src/test/resources/specs/petstore.yaml"/>

                <SectionHeader>Auto configure</SectionHeader>
                <SwitchToggle onChange={(event) => console.log(event.target.checked)}/>

                <AccordionHeader open={expandAdvancedSettings}
                                 onClick={() => setExpandAdvancedSettings(!expandAdvancedSettings)}>
                    Advanced settings
                </AccordionHeader>
                <ExpandableContent open={expandAdvancedSettings}>
                    <Words>Coming soon. (Disable proxy, authentication, etc.)</Words>
                </ExpandableContent>
            </Form>
            <Button isLoading={true}>Create</Button>
        </FormContainer>
    );
};

export default NewApiForm;
