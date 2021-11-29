import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    
    * {
    box-sizing: border-box;
}

html {
    font-family: cursive,'Noto Sans JP', sans-serif;
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    height: 100%;
    margin: 0;
    padding: 0;
    animation-name: background_animation;
    animation-duration: 10s;
    animation-iteration-count: infinite;
}
#main {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}


@keyframes background_animation {
    0% { background-color:red;}
    10% {background-color:yellow;}
    20% {background-color:orange;}
    30% {background-color:#AAFF00;}
    40%{background-color:limegreen;}
    50%{background-color:lightblue;}
    60%{background-color:cyan;}
    70%{background-color:limegreen;}
    80%{background-color:orange;}
    90%{background-color:yellow;}
    100%{background-color:red;}
}

`;

export default GlobalStyle;
