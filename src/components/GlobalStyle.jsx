import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding-top: 65px;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient( 135deg, #FFCF71 10%, #2376DD 100%);
    background-attachment: fixed;
  }
`;

export default GlobalStyle;