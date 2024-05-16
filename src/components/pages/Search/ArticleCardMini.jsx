import { Link } from "react-router-dom";
import { toDaysMonthsYears } from "../../../utils/formatTimeStamp";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const ArticleCardMini = ({ article }) => {
  const articleUrl = `/articles/${article.article_id}`;
  return (
    <Link className="link" to={articleUrl}>
      <Card
        style={{ width: "22rem", textAlign: "center"}}
        className="bg-secondary"
      >
        <Card.Header className="h5 text-black">{article.title}</Card.Header>
        <Card.Img src={article.article_img_url} variant="top" />
        <Row>
          <Col xs={6}>
          <Card.Text><FontAwesomeIcon icon={faAt} color="black" aria-label="author icon" title="author:"/> {article.author}</Card.Text>
          </Col>
          <Col xs={6}>
          <Card.Text><FontAwesomeIcon icon={faBook} color="black" aria-label="topic icon" title="topic:"/> {article.topic}</Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text><FontAwesomeIcon icon={faThumbsUp} color="black" aria-label="votes icon" title="votes:"/> {article.votes}</Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text> <FontAwesomeIcon icon={faComment} color="black" aria-label="comments icon" title="comments:"/> {article.comment_count}</Card.Text>
          </Col>
        </Row>
        <Card.Footer>
          Posted: {toDaysMonthsYears(article.created_at)}
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default ArticleCardMini;
