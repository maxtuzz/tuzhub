import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Form = styled.form`
  display: flex;
  background-color: #2c2c30;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  border-radius: 5px;
`;

const Input = styled.input`
  border: none; 
  background-color: #2c2c30;
  color: white;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  height: 40px;
`;

const InputIcon = styled(FontAwesomeIcon)`
  padding-left: 10px;
  padding-right: 10px;
`;

const SearchBar = () => (
    <Form>
        <InputIcon icon={Icons.faSearch} color={"grey"}/>
        <Input type="text" placeholder="Search"/>
    </Form>
);

export default SearchBar;