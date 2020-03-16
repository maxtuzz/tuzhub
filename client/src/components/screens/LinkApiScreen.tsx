import React from "react";
import PageTitle from "../lib/PageTitle";
import Words from "../lib/Words";
import ScreenArea from "./ScreenArea";
import Input from "../lib/Input";
import styled from "styled-components";
import SwitchToggle from "../lib/SwitchToggle";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; 
`;

const Form = styled.form`
  margin-top: 1em;
  margin-bottom: 2em;
  border-radius: 5px;
`;

const FormInput = styled(Input)`
  margin-bottom: 1em;
`;

const LinkApiScreen: React.FC = () => (
    <ScreenArea>
        <PageTitle>
            Add API
        </PageTitle>
        <Words>
            You can provide either a link to a JSON or YAML spec, and Tuzzy will keep it updated. Or you can provide the
            spec itself.
        </Words>

        <FormContainer>
            <Form>
                <label>
                    <FormInput type="text" placeholder="Display name"/>
                </label>
                <FormInput type="text" placeholder="Description"/>
                <FormInput type="text" placeholder="Spec url"/>
                <FormInput type="text" placeholder="Spec url"/>
                <SwitchToggle/>
            </Form>
        </FormContainer>
    </ScreenArea>
);

export default LinkApiScreen;