import styled from "styled-components";

const Button = styled.button`
background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 25px;
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: opacity 0.2s ease;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  
  &:hover {
    outline: solid white;
    border-radius: 25px;
  }
`;

export default Button;