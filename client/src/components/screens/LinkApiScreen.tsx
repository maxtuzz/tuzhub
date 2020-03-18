import React from "react";
import Words from "../lib/Words";
import ScreenArea from "./ScreenArea";
import Input from "../lib/Input";
import styled from "styled-components";
import SwitchToggle from "../lib/SwitchToggle";
import HeaderText from "../lib/HeaderText";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%; 
`;

const Form = styled.form`
  margin-top: 1em;
  margin-bottom: 2em;
  border-radius: 5px;
`;

const FormInput = styled(Input)<{invalid?: boolean}>`
  margin-bottom: 1em;
  
  border-bottom: ${props => props.invalid && "1px solid red"};
`;

const LinkApiScreen: React.FC = () => (
    <ScreenArea>
        <FormContainer>
            <Form>
                <HeaderText>Link API</HeaderText>
                <Words>Enter in some basic details about the API you want to link</Words>
                <FormInput type="text" placeholder="Display name"/>
                <FormInput type="text" placeholder="Summary"/>

                <HeaderText>Spec</HeaderText>
                <Words>You can either choose to link a spec directly and let Tuzzy take care of polling it for changes.
                    Or you can upload it directly.</Words>
                <FormInput type="text"
                           placeholder="https://raw.githubusercontent.com/maxtuzz/tuzzy-dev-portal/master/server/src/test/resources/specs/petstore.yaml"/>
                <SwitchToggle/>
            </Form>
        </FormContainer>
    </ScreenArea>
);

export default LinkApiScreen;