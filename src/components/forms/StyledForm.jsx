import styled from "styled-components";

const StyledForm = styled.form`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-bottom: 10px;
padding: 10px;
gap: 10px;

background: rgba(255, 255, 255, 0.1);

select {
    border: none;
    border-radius: 4px;
    background-color: black;
    color: white;
  }

input {
  background-color: black;
  color: white;
  border: none;
}

textarea {
  background-color: black;
  color: white;
}

color: white;
`

export default StyledForm;