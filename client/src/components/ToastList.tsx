import React from "react";
import styled from "styled-components";
import Notification from "../model/Notification";
import Words from "./lib/Words";
import {fadeInBottomCss} from "../styling/anims";

const ToastListContainer = styled.div`
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: 2em;
`;

const Toast = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  // Size
  min-width: 40em;
  height: 3em;
  border-radius: 5px;
  margin: 1em;
  
  // Colors
  background-color: rgba(81,174,192,0.48);
  
  ${fadeInBottomCss}
`;

const ToastContent = styled(Words)`
  font-weight: 600;
  color: #b9bbbe;
  padding: 20px;
`

interface Props {
    notifications: Notification[]
}

/**
 * Renders a list of popover toast notifications
 * Todo: Mapping is being shit
 * @param notifications
 * @constructor
 */
const ToastList: React.FC<Props> = ({notifications}) => {

    return (
        <ToastListContainer>
            {notifications.map(value => {
                console.log("##############: " + value);
                    return <Toast>
                        <ToastContent>
                            {value.message}
                        </ToastContent>
                    </Toast>;
                }
            )}
        </ToastListContainer>
    );
};

export default ToastList;