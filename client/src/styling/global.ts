import {css} from "styled-components";

const scrollbarStyling = css`
  scrollbar-color: ${props => props.theme.colors.secondary} ${props => props.theme.colors.sidebarColor};
`;

export {
    scrollbarStyling
}