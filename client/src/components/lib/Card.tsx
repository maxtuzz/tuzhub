import styled, {css} from "styled-components";

export const CardTitle = styled.div`
  color: #b9bbbe;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 600;
`;

export const Card = styled.div<{ clickable?: boolean, fadeInFor?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 230px;
  height: 180px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 20px; 
  border-radius: 10px;
  background-color: #2c2c30;
  
  @media (max-width: 1126px) {
      width: 140px;
      height: 100px;
  }
  
  ${props =>
    props.clickable && css`
        &:hover {
          cursor: pointer;
          background: #37373b;
        }
  `}
  
  ${props =>
    props.fadeInFor && css<{ fadeInFor?: number }>`
        animation: cardFadeIn ${props.fadeInFor}s;
        -moz-animation: cardFadeIn ${props.fadeInFor}s; /* Firefox */
        -webkit-animation: cardFadeIn ${props.fadeInFor}s; /* Safari and Chrome */
        -o-animation: cardFadeIn ${props.fadeInFor}s; /* Opera */
  `}
  
  @keyframes cardFadeIn {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
  }
`;
