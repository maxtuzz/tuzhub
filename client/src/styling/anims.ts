import {css} from "styled-components";

/**
 * Will play a small wiggle animation on hover when attached to a component
 */
const delayedWiggle = css`
    &:hover {
      animation: wiggle 2.5s;
      animation-iteration-count: infinite;
    }
    
    @keyframes wiggle {
      0% { transform: rotate(0deg); }
      80% { transform: rotate(0deg); }
      85% { transform: rotate(5deg); }
      95% { transform: rotate(-5deg); }
      100% { transform: rotate(0deg); }
  }
`;

export {
    delayedWiggle
};