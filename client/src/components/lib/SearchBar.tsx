import styled from "styled-components";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Input, {InputIcon} from "./Input";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
  background-color: ${props => props.theme.colors.main};
  border-radius: 5px;
`;

interface Props {
    placeholder?: string
    autofocus?: boolean
    defaultText?: string
}

interface Functions {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
}

/**
 * Live search bar component - supply function, placeholder text, and whether auto focus should be toggled on
 * @param onChange
 * @param placeholder
 * @param autofocus
 * @param defaultText - if there should be anything filled out in search by default
 * @constructor
 */
const SearchBar: React.FC<Props & Functions> = ({onChange, placeholder, autofocus, defaultText = ""}) => (
    <Form>
        <InputIcon icon={Icons.faSearch} color={"grey"}/>
        <Input defaultValue={defaultText}
               onChange={onChange} type="text" placeholder={placeholder ? placeholder : "Search"}
               autoFocus={autofocus}/>
    </Form>
);

export default SearchBar;