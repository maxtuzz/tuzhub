import styled from "styled-components";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Input, {InputIcon} from "./Input";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  background-color: #2c2c30;
  border-radius: 5px;
`;

interface Props {
    placeholder?: string
    autofocus?: boolean
}

interface Functions {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
}

const SearchBar: React.FC<Props & Functions> = ({onChange, placeholder, autofocus}) => (
    <Form>
        <InputIcon icon={Icons.faSearch} color={"grey"}/>
        <Input onChange={onChange} type="text" placeholder={placeholder ? placeholder : "Search"}
               autoFocus={autofocus}/>
    </Form>
);

export default SearchBar;