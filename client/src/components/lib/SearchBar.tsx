import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  border-radius: 5px;
  background-color: #2c2c30;
`;

const Input = styled.input`
  border: none; 
  width: 95%;
  height: 40px;
  background-color: #2c2c30;
  color: white;
  font-size: 16px;
  font-weight: 400;
`;

const InputIcon = styled(FontAwesomeIcon)`
  padding-left: 10px;
  padding-right: 10px;
`;

const SearchBar = ({onChange}: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => any }) => (
    <Form>
        <InputIcon icon={Icons.faSearch} color={"grey"}/>
        <Input onChange={onChange} type="text" placeholder="Search" autoFocus/>
    </Form>
);

export default SearchBar;