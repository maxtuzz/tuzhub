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
  width: 250px;
  height: 200px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 20px; 
  border-radius: 10px;
  background-color: #2c2c30;
  
  ${props =>
    props.clickable && css`
        &:hover {
          cursor: pointer;
          background: #37373b
        }
  `}
  
  ${props =>
     props.fadeInFor && css<{fadeInFor?: number}>`
        animation: fadein ${props => props.fadeInFor}s;
        -moz-animation: fadein ${props => props.fadeInFor}s; /* Firefox */
        -webkit-animation: fadein ${props => props.fadeInFor}s; /* Safari and Chrome */
        -o-animation: fadein ${props => props.fadeInFor}s; /* Opera */
  `}
  
  @keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
`;
