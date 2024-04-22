import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding-top: 55px;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
    background: linear-gradient( 135deg, #FFCF71 10%, #2376DD 100%);
    // background: #CAE4DB;

    background-attachment: fixed;
  }
`;

export default GlobalStyle;
