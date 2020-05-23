import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {fadeIn, fadeOut, popIn, popOut} from "../../styling/anims";
import HeaderText from "./HeaderText";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {scrollbarStyling} from "../../styling/global";

const MODAL_CLOSE_TIMEOUT_MILLIS = 300;

const ModalContainer = styled.div<{ out: boolean }>`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  animation: ${props => props.out ? fadeOut : fadeIn} ${MODAL_CLOSE_TIMEOUT_MILLIS}ms linear forwards;
  
  width: 100vw;
  height: 100vh;
  
  background-color: rgba(0,0,0,0.37);
`;

const ModalHeaderText = styled(HeaderText)`
  margin-top: 0;
  margin-bottom: 0;
`;

const ModalWindow = styled.div<{ out: boolean }>`
  background-color: ${props => props.theme.colors.main};
  
  // Animation glitches see https://stackoverflow.com/questions/41965978/react-styled-components-fade-in-fade-out
  animation: ${props => props.out ? popOut : popIn} 0.1s linear ${props => props.out ? "forwards" : "backwards"};
  
  width: 50em;
  
  @media (max-width: 1126px) {
      width: 100vw;
      height: 100vh;
  }
  
  padding: 20px;
  border-radius: 5px;
`;

const HeaderContainer = styled.div<{contentExists: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  // Space before content
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  overflow-y: auto;
  max-height: 35em;

  @media (max-width: 1126px) {
      height: 95vh;
  }
  
  ${scrollbarStyling}
`;

const IconButton = styled(FontAwesomeIcon)`
  padding: 5px 8.5px;
  border-radius: 100px; 
  transition: all 0.1s ease-in;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: rgba(111,109,109,0.54);
  }
`;

interface Props {
    children?: JSX.Element
    open: boolean
    title: string
    onClose?: () => any
}

/**
 * Used to display content over the screen
 * @param children
 * @param open
 * @param title
 * @param onClose
 * @constructor
 */
const Modal: React.FC<Props> = ({children, open, title, onClose}) => {
    const [showModal, setShowModal] = useState<boolean>(open);

    useEffect(() => {
        setShowModal(open);
    }, [open]);

    const onClickCapture = () => {
        setShowModal(false);

        if (onClose) {
            // Only call on close method once closing animation has finished
            setTimeout(() => {
                onClose();
            }, MODAL_CLOSE_TIMEOUT_MILLIS);
        }
    };

    return (
        <ModalContainer out={!showModal}>
            <ModalWindow out={!showModal}>
                <HeaderContainer contentExists={children !== undefined}>
                    {
                        title ? (
                            <ModalHeaderText>
                                {title}
                            </ModalHeaderText>
                        ) : <></>
                    }
                    <IconButton icon={Icons.faTimes} color={"grey"} size={"lg"} onClick={onClickCapture}/>
                </HeaderContainer>
                {showModal &&
                <ModalContent>
                    {children}
                </ModalContent>
                }
            </ModalWindow>
        </ModalContainer>
    );
};

export default Modal;