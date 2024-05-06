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

const CarouselContainer = styled.section`
  width: calc(100vw - 10vw);
  max-width: 450px;
  z-index: 0;
  border-radius: 10px;
`;

const StyledCarousel = styled(CCarousel)`
  .carousel-item img {
    width: 90vw;
    height: 63vw;
    max-width: 450px;
    max-height: 315px;
    margin-bottom: -4px; /* accounts for a bug in the component that leaves a gap */
  }

  .carousel-captions {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    color: white;

    a {
      color: white;
      text-decoration: none;
    }
    h3 {
      font-family: Helvetica, Sans-Serif;
      font-weight: 300;
      font-size: 15px;
      text-shadow: 1px 1px black;
    }
    p {
      font-size: 15px;
      font-family: Helvetica, Sans-Serif;
      font-weight: 600;
      text-shadow: 1px 1px black;
    }
  }
`;

const Carousel = ({isLoading, setIsLoading}) => {
  const [articles, setArticles] = useState([]);

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
        {/* <CarouselTitle>Latest Articles</CarouselTitle> */}
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
        {/* <CarouselBottom /> */}
      </CarouselContainer>
    );
  }
};

export default Carousel;
