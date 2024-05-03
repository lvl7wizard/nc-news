
import Starfield from 'react-starfield';
import styled from 'styled-components';

const BackgroundWrapper = styled.div`
position: relative;
z-index: -1;
`

function Background() {
  return (
    <BackgroundWrapper>
      <Starfield
        starCount={4000}
        starColor={[255, 255, 255]}
        speedFactor={0.02}
        backgroundColor="black"
      />
    </BackgroundWrapper>
  );
}

export default Background;