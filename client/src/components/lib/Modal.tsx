import React, {useState} from "react";
import styled from "styled-components";
import {fadeIn, fadeOut, popIn, popOut} from "../../styling/anims";

const ModalContainer = styled.div<{out: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} 0.1s linear;
  transition: visibility 0.1s linear;
  
  width: 100vw;
  height: 100vh;
  
  background-color: rgba(0,0,0,0.37);
`;

const ModalContents = styled.div<{out: boolean}>`
  background-color: aliceblue;
  
  display: inline-block;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? popOut : popIn} 0.1s linear;
  transition: visibility 0.1s linear;
  
  min-width: 50em;
  min-height: 40em;
  
  padding: 10px;
  border-radius: 5px;
`;

interface Props {
    children?: JSX.Element
    open: boolean
    title: string
}

/**
 * Used to display content over the screen
 * @param children
 * @param open
 * @param title
 * @constructor
 */
const Modal: React.FC<Props> = ({children, open, title}) => {
    const [showModal, setShowModal] = useState<boolean>(open);

    // useEffect(() => {
    //     setShowModal(true);
    // }, [open]);

    return (
        <ModalContainer onClickCapture={() => setShowModal(false)} out={!showModal}>
            <ModalContents out={!showModal}>
                {children}
            </ModalContents>
        </ModalContainer>
    );
};

export default Modal;