import React, { useEffect, useState } from "react";
import { getArticles } from "../../../../utils/apiRequest";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import styled from "styled-components";
import "./carousel-styles.min.css";
import Loading from "../../../loading/Loading";
import { toRelativeTime } from "../../../../utils/formatTimeStamp";
import { Link } from "react-router-dom";
import AbsoluteCenterContent from "../../../layout/CenterContent/AbsoluteCenterContent"

const CarouselContainer = styled.section`
  width: 100%;
  max-width: 700px;
`;

const CarouselTitle = styled.header`
  background: black;
  color: white;
  padding: 5px;
  text-align: center;
  border-radius: 30px 30px 0 0;
`;

const CarouselBottom = styled.div`
  background: black;
  padding: 37px;
  margin-top:-4px;
  border-radius: 0 0 30px 30px;
`;

const StyledCarousel = styled(CCarousel)`
  .carousel-item img {
    width: 100%;
    height: auto;
  }

  .carousel-captions {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    color: white;

    a {
      color: white;
      text-decoration: none;
    }
  }
`;

const Carousel = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((response) => {
        setArticles(response);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return ( 
      <Loading />
    )
  } else {
    return (
      <CarouselContainer>
        <CarouselTitle>
          <h1>Welcome to NC News!</h1>
        </CarouselTitle>
        <StyledCarousel controls>
          {articles.slice(0, 8).map((article) => (
            <CCarouselItem key={article.article_id + article.author}>
              <Link to={`/articles/${article.article_id}`}>
                <CCarouselCaption className="carousel-captions">
                  <h3>{article.title}</h3>
                  <p>Posted {toRelativeTime(article.created_at)}</p>
                </CCarouselCaption>
              </Link>
              <CImage
                className="d-block w-100"
                src={article.article_img_url}
                alt="slide 1"
              />
            </CCarouselItem>
          ))}
        </StyledCarousel>
        <CarouselBottom/>
      </CarouselContainer>
    );
  }
};

export default Carousel;