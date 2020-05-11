import {css, keyframes} from "styled-components";

/**
 * Will play a small wiggle animation on hover when attached to a component
 */
const delayedWiggle = css`
    &:hover {
      animation: wiggle 2.5s infinite;
    }
    
    @keyframes wiggle {
      0% { transform: rotate(0deg); }
      80% { transform: rotate(0deg); }
      85% { transform: rotate(5deg); }
      95% { transform: rotate(-5deg); }
      100% { transform: rotate(0deg); }
  }
`;

const popIn = keyframes`
     from {
         transform: scale(0);
         opacity: 0;
     }
     to {
         transform: scale(1);
         opacity: 1;
     }
`;

const popOut = keyframes`
     from {
         transform: scale(1);
         opacity: 1;
     }
     to {
         transform: scale(0);
         opacity: 0;
     }
`
const fadeIn = keyframes`
     from {
         opacity: 0;
     }
     to {
         opacity: 1;
     }
`;

const fadeOut = keyframes`
     from {
         opacity: 1;
     }
     to {
         opacity: 0;
     }
`;

const fadeInTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/**
 * Can be added to any styled component to add a fade in and down effect upon rendering
 */
const fadeInTopCss = css`
    animation: ${fadeInTop} 0.3s;
    -moz-animation: ${fadeInTop} 0.3s; /* Firefox */
    -webkit-animation: ${fadeInTop} 0.3s; /* Safari and Chrome */
    -o-animation: ${fadeInTop} 0.3s; /* Opera */
`;

const fadeInBottomCss = css`
    animation: ${fadeInBottom} 0.3s;
    -moz-animation: ${fadeInBottom} 0.3s; /* Firefox */
    -webkit-animation: ${fadeInBottom} 0.3s; /* Safari and Chrome */
    -o-animation: ${fadeInBottom} 0.3s; /* Opera */
`;

export {
    fadeIn,
    fadeOut,
    popIn,
    popOut,
    delayedWiggle,
    fadeInTop,
    fadeInTopCss,
    fadeInBottomCss
};