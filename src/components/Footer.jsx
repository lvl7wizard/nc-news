import styled from "styled-components";

const Foot = styled.footer`
    background-color: black;
    color: white;
    width: 100%;
    padding: 20px;
    position: fixed;
    bottom: 0px;
    font-size: 12px;
    `

const Footer = () => {
    return <Foot>Dave Judge 2024</Foot>
}

export default Footer;