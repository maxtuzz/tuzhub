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
    delayedWiggle,
    fadeInTop,
    fadeInTopCss,
    fadeInBottomCss
};