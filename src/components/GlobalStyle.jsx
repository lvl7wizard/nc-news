import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding-top: 62px;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #1c90bf, #eb8a3d);
    background-attachment: fixed;
  }
`;

export default GlobalStyle;