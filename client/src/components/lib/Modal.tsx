import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {fadeIn, fadeOut, popIn, popOut} from "../../styling/anims";
import HeaderText from "./HeaderText";

const MODAL_CLOSE_TIMEOUT_MILLIS = 300;

const ModalContainer = styled.div<{ out: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} ${MODAL_CLOSE_TIMEOUT_MILLIS}ms linear;
  transition: visibility ${MODAL_CLOSE_TIMEOUT_MILLIS}ms linear;
  
  width: 100vw;
  height: 100vh;
  
  background-color: rgba(0,0,0,0.37);
`;

const ModalContents = styled.div<{ out: boolean }>`
  background-color: ${props => props.theme.colors.main};
  
  display: inline-block;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? popOut : popIn} 0.1s linear;
  transition: visibility 0.1s linear;
  
  min-width: 50em;
  min-height: 40em;
  
  padding: 10px 20px;
  border-radius: 5px;
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
        <ModalContainer onClickCapture={onClickCapture} out={!showModal}>
            <ModalContents out={!showModal}>
                {
                    title && (
                        <HeaderText>
                            {title}
                        </HeaderText>
                    )
                }
                {showModal && children}
            </ModalContents>
        </ModalContainer>
    );
};

export default Modal;