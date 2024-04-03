import Carousel from "../../pages/Home/Carousel/Carousel"
import styled from "styled-components"

const StyledDiv = styled.div`
display: flex;
justify-content: center;
height: calc(100vh - 180px);
align-items: center;
`

const Home = () => {
    return (
    <StyledDiv>
        <Carousel/>
    </StyledDiv>
    )
}

export default Home;