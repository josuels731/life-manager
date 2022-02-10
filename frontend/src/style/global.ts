
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   
    :root {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        margin: 0;
        padding: 0;
        background-color: #0A0A0A;
        color: #FFF;
        font-family: "Montserrat";
        user-select: none;
    }
    
    body {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    
    #root {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    svg {
        width: 100%;
        height: 100%;
    }

`;

export default GlobalStyle;