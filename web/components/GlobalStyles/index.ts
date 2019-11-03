import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    font-family: 'Roboto', sans-serif;
    height: 100%;
    font-size: 10px;
    /* background-color: #1f1f1f; */
  }

  #root {
    height: 100%;
  }

  button {
    background: none;
    border: none;
    padding: unset;
    margin: unset;
    cursor: pointer;
    outline: none;
  }
`;

export default GlobalStyle;
