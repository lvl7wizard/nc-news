import React, { useEffect, useState } from "react";
import { getArticles } from "../../utils/apiRequest";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import "./carousel-styles.min.css";
import { toRelativeTime } from "../../utils/formatTimeStamp";
import { Link } from "react-router-dom";
import Loading from "../Loading";

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
        setIsLoading(true);
      });
  }, []);

  if (isLoading) {
    return <Loading/>;
  } else {
    return (
      <CCarousel className="carousel" controls>
        {articles.slice(0, 5).map((article) => {
          return (
            <CCarouselItem key={article.article_id + article.author}>
              <CCarouselCaption className="carousel-captions">
                <Link to={`/articles/${article.article_id}`}>
                  <h3>{article.title}</h3>
                  <p>Posted {toRelativeTime(article.created_at)}</p>
                </Link>
              </CCarouselCaption>
              <CImage
                className="d-block w-100"
                src={article.article_img_url}
                alt="slide 1"
              />
            </CCarouselItem>
          );
        })}
      </CCarousel>
    );
  }
};

export default Carousel;
