import {css} from "styled-components";

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

/**
 * Can be added to any styled component to add a fade in and down effect upon rendering
 */
const fadeInTop = css`
    animation: fadeinTop 0.3s;
    -moz-animation: fadeinTop 0.3s; /* Firefox */
    -webkit-animation: fadeinTop 0.3s; /* Safari and Chrome */
    -o-animation: fadeinTop 0.3s; /* Opera */

    @keyframes fadeinTop {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
`;

const fadeInBottom = css`
    animation: fadeinBottom 0.3s;
    -moz-animation: fadeinBottom 0.3s; /* Firefox */
    -webkit-animation: fadeinBottom 0.3s; /* Safari and Chrome */
    -o-animation: fadeinBottom 0.3s; /* Opera */

    @keyframes fadeinBottom {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
`;

export {
    delayedWiggle,
    fadeInTop,
    fadeInBottom
};