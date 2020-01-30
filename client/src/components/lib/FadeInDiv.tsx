import styled from "styled-components";

const FadeInDiv = styled.div`
  animation: fadein 0.3s;
  -moz-animation: fadein 0.3s; /* Firefox */
  -webkit-animation: fadein 0.3s; /* Safari and Chrome */
  -o-animation: fadein 0.3s; /* Opera */

  @keyframes fadein {
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

export default FadeInDiv