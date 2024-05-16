import styled from "styled-components";

const NotFoundContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
height: calc(100vh - 60px);
min-height: 150px;
`;

const NotFound = () => {
    return (<NotFoundContainer>
<h3>404 - Not Found</h3>
<p>Sorry, the page you are looking for does not exist.</p>
    </NotFoundContainer>

    )
}

export default NotFound;