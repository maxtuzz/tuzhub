import React, {useState} from "react";
import HeaderText from "./lib/HeaderText";
import Words from "./lib/Words";
import SwitchToggle from "./lib/SwitchToggle";
import AccordionHeader from "./lib/AccordionHeader";
import styled from "styled-components";
import Input from "./lib/Input";
import ExpandableContent from "./lib/ExpandableContent";
import {ButtonStyled} from "./lib/Button";
import SectionHeader from "./lib/SectionHeader";
import FadeInContent from "./lib/FadeInContent";
import Tabs, {Tab} from "./lib/tabs/Tabs";
import {sampleYaml} from "../assets/samples/spec";
import {useForm} from "react-hook-form";

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

const SpecTextArea = styled.textarea`
  margin-top: 0.3em;
  padding: 0.7em 0.7em 0.7em 0.7em;
  outline: none;
  border: none; 
  width: 98%;
  height: 30em;
  background-color: #2c2c30;
  color: white;
  font-size: 16px;
  font-weight: 400;
  border-radius: 5px;
`;

const SubmitButton = styled(ButtonStyled)`
  margin-top: 3em;
  width: 95%;
`;

interface FormData {
    displayName: string
    description: string
    specUrl: string
    fullSpec: string
    dynamicConf: boolean
}

const ApiForm: React.FC = () => {
    const [expandAdvancedSettings, setExpandAdvancedSettings] = useState(false);
    const {register, setValue, handleSubmit, errors} = useForm<FormData>();

    const onSubmit = handleSubmit((data: FormData) => {
        alert("Hello there" + JSON.stringify(data));
    });

    return (
        <FormContainer>
            <Form onSubmit={onSubmit}>
                <HeaderText>Add API</HeaderText>
                <Words>Enter in some basic details about the API you want to link</Words>
                <FormInput type="text" placeholder="Display name" name={"displayName"}
                           ref={register({required: true, maxLength: 20, })}/>
                {errors.displayName && <Words>Wrongg!!!</Words>}
                <FormInput type="text" placeholder="Summary" name={"description"} ref={register}/>

                <HeaderText>Spec</HeaderText>
                <Words>You can either choose to link a spec directly and let Tuzzy take care of polling it for changes.
                    Or you can upload it directly.</Words>
                <Words>Multiple specs can be assigned to an API after creation (versions, pre-release demos
                    etc.)</Words>

                <Tabs>
                    <Tab label="Remote">
                        <Words>Provide an URL to remote spec</Words>
                        <FormInput type="text"
                                   placeholder="https://raw.githubusercontent.com/maxtuzz/tuzzy-dev-portal/master/server/src/test/resources/specs/petstore.yaml"
                                   name={"specUrl"}
                                   ref={register}
                        />
                        <SectionHeader>Auto configure</SectionHeader>
                        <SwitchToggle name={"dynamicConf"} register={register}/>
                    </Tab>
                    <Tab label="Upload">
                        <FadeInContent>
                            <Words>Paste a valid OpenAPI spec</Words>
                            <SpecTextArea placeholder={sampleYaml} name="fullSpec" ref={register}/>
                        </FadeInContent>
                    </Tab>
                </Tabs>

                <AccordionHeader open={expandAdvancedSettings}
                                 onClick={() => setExpandAdvancedSettings(!expandAdvancedSettings)}>
                    Advanced settings
                </AccordionHeader>
                <ExpandableContent open={expandAdvancedSettings}>
                    <Words>Coming soon. (Disable proxy, authentication, etc.)</Words>
                </ExpandableContent>
                <SubmitButton type="submit">
                    Create
                </SubmitButton>
            </Form>
        </FormContainer>
    );
};

export default ApiForm;
