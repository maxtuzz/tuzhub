import React from "react";
import styled, {css} from "styled-components";
import Notification from "../model/Notification";
import Words from "./lib/Words";
import {fadeInBottomCss} from "../styling/anims";
import NotificationType from "../model/NotificationType";

const ToastListContainer = styled.div`
  position: fixed;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: 2em;
`;

const Toast = styled.div<{ type: NotificationType }>`
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
  ${props => props.type === NotificationType.INFO && css`
    background-color: rgba(81,174,192,0.75);
  `}
  
  ${props => props.type === NotificationType.WARNING && css`
    background-color: rgba(255,204,15,0.75);
  `}
  
  ${props => props.type === NotificationType.ERROR && css`
    background-color: rgba(246,21,21,0.75);
  `}
  
  ${fadeInBottomCss}
`;

const ToastContent = styled(Words)`
  font-weight: 600;
  color: ${props => props.theme.colors.words};
  padding: 20px;
`

interface Props {
    notifications: Notification[]
}

interface Functions {
    notificationClicked: (key: string) => void
}

/**
 * Renders a list of popover toast notifications
 * @param notifications
 * @param dismissNotification
 * @constructor
 */
const ToastList: React.FC<Props & Functions> = ({notifications, notificationClicked}) => (
    <ToastListContainer>
        {
            notifications.map(value =>
                <Toast type={value.type}
                       onClick={() => notificationClicked(value.message)}>
                    <ToastContent>
                        {value.message}
                    </ToastContent>
                </Toast>
            )
        }
    </ToastListContainer>
);

export default ToastList;