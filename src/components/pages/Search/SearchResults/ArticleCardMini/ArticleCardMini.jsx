import { Link } from "react-router-dom";
import { toDaysMonthsYears } from "../../../../../utils/formatTimeStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faThumbsUp,
  faAt,
  faBook,
  faFutbol,
  faTerminal,
  faUtensils
  
} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ArticleCardMini = ({ article }) => {
  const articleUrl = `/articles/${article.article_id}`;
  let topicIcon = ""
  if (article.topic === "football") {
    topicIcon = faFutbol
  } else if (article.topic === "coding") {
    topicIcon = faTerminal
  } else if (article.topic === "cooking") {
    topicIcon = faUtensils
  } else {
    topicIcon = faBook
  }

  return (
    <Link className="link" to={articleUrl}>
      <Card
        style={{ width: "22rem", textAlign: "center" }}
        className={`bg-dark bg-opacity-75 variant-dark`}
      >
        <Card.Header className={`h5 text-light`}>{article.title}</Card.Header>
        <Card.Img
          src={article.article_img_url}
          variant="top"
          alt={`article image for ${article.title}`}
        />
        <Row className="text-light">
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faAt}
                color="lightblue"
                aria-label="author icon"
                title="author:"
              />{" "}
              {article.author}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={topicIcon}
                color="pink"
                aria-label="topic icon"
                title="topic:"
              />{" "}
              {article.topic}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faThumbsUp}
                color="lightgreen"
                aria-label="votes icon"
                title="votes:"
              />{" "}
              {article.votes}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <FontAwesomeIcon
                icon={faComment}
                color="burlywood"
                aria-label="comments icon"
                title="comments:"
              />{" "}
              {article.comment_count}
            </Card.Text>
          </Col>
        </Row>
        <Card.Footer className={`text-white bg-secondary bg-opacity-50`}>
          Posted: {toDaysMonthsYears(article.created_at)}
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default ArticleCardMini;