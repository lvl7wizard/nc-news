import React, { useEffect, useState } from "react";
import { getArticles } from "../../utils/apiRequest";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import styled from "styled-components";
import "./carousel-styles.min.css";
import Loading from "../Loading";
import { toRelativeTime } from "../../utils/formatTimeStamp";
import { Link } from "react-router-dom";

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
  border-radius: 20px;
  overflow: hidden;
`;

const CarouselTitle = styled.div`
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 5px;
  text-align: center;
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
    return <Loading />;
  } else {
    return (
      <CarouselContainer>
        <CarouselTitle>
          <h3>Latest articles</h3>
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
      </CarouselContainer>
    );
  }
};

export default Carousel;
