import Carousel from "./home_components/Carousel";
import styled from "styled-components";

const HomeContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 80vh;
`

const Home = () => {
    return (
    <HomeContainer>
    <Carousel/>
    </HomeContainer>
    )
}

export default Home;