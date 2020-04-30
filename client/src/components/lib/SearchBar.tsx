import styled from "styled-components";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Input, {InputIcon} from "./Input";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  background-color: #222931;
  border-radius: 5px;
`;

interface Props {
    placeholder?: string
    autofocus?: boolean
}

interface Functions {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
}

/**
 * Live search bar component - supply function, placeholder text, and whether auto focus should be toggled on
 * @param onChange
 * @param placeholder
 * @param autofocus
 * @constructor
 */
const SearchBar: React.FC<Props & Functions> = ({onChange, placeholder, autofocus}) => (
    <Form>
        <InputIcon icon={Icons.faSearch} color={"grey"}/>
        <Input onChange={onChange} type="text" placeholder={placeholder ? placeholder : "Search"}
               autoFocus={autofocus}/>
    </Form>
);

export default SearchBar;