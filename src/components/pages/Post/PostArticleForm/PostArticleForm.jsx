import { UserContext } from "../../../../contexts/User";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormText from "react-bootstrap/FormText";
import InputGroup from "react-bootstrap/InputGroup";
import isValidUrl from "../../../../utils/isValidUrl";
import hasImgExtension from "../../../../utils/hasImgExtension";
import { postArticle } from "../../../../utils/apiRequest";

const PostArticleForm = () => {
  const { currentUser } = useContext(UserContext);
  const [usernameValid] = useState(true);
  const [articleTitle, setArticleTitle] = useState("");
  const [titleValid, setTitleValid] = useState(false);
  const [titleInvalid, setTitleInvalid] = useState(false);
  const [articleBody, setArticleBody] = useState("");
  const [bodyValid, setBodyValid] = useState(false);
  const [bodyInvalid, setBodyInvalid] = useState(false);
  const [articleTopic, setArticleTopic] = useState("");
  const [topicValid, setTopicValid] = useState(false);
  const [topicInvalid, setTopicInvalid] = useState(false);
  const [articleImage, setArticleImage] = useState("");
  const [imageValid, setImageValid] = useState(false);
  const [imageInvalid, setImageInvalid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTitleInvalid(false);
    if (articleTitle.length >= 6) {
      setTitleValid(true);
    } else {
      setTitleValid(false);
    }
  }, [articleTitle]);

  useEffect(() => {
    setBodyInvalid(false);
    if (articleBody.length >= 20) {
      setBodyValid(true);
    } else {
      setBodyValid(false);
    }
  }, [articleBody]);

  useEffect(() => {
    setImageInvalid(false);
    if (isValidUrl(articleImage) && hasImgExtension(articleImage)) {
      setImageValid(true);
    } else {
      setImageValid(false);
    }
  }, [articleImage]);

  const updateTitle = (event) => {
    setArticleTitle(event.target.value);
  };
  const updateBody = (event) => {
    setArticleBody(event.target.value);
  };

  const updateImage = (event) => {
    setArticleImage(event.target.value);
  };

  const updateTopic = (event) => {
    setArticleTopic(event.target.value);
    setTopicValid(true);
    setTopicInvalid(false);
  };

  const useDefaultImage = () => {
    setArticleImage(
      "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (articleTitle.length <= 5) {
      setTitleInvalid(true);
    }
    if (articleBody.length < 20) {
      setBodyInvalid(true);
    }
    if (!isValidUrl(articleImage) && !hasImgExtension(articleImage)) {
      setImageInvalid(true);
    }
    if (!topicValid) {
      setTopicInvalid(true);
    }
    if (titleValid && bodyValid && imageValid) {
      console.log("success");
      const requestBody = {
        author: currentUser.username,
        title: articleTitle,
        body: articleBody,
        topic: articleTopic,
        article_img_url: articleImage,
      };
      try {
        const response = await postArticle(requestBody);
        // redirect on successful response
        navigate(`/articles/${response.data.article.article_id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col style={{ maxWidth: "800px" }}>
          <Card className="shadow-lg bg-dark bg-opacity-75 text-light">
            <Card.Header
              className="text-center pt-3 pb-2 rounded-top text-light border-bottom-0"
              style={{ textShadow: "2px 2px black" }}
            >
              <h2 className="mb-0">Post an Article</h2>
            </Card.Header>
            <Card.Body className="text-light rounded-bottom">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2" controlId="articleAuthor">
                      <Form.Label className="text-light">Author:</Form.Label>
                      <Form.Control
                        type="text"
                        value={currentUser.username}
                        disabled
                        isValid={usernameValid}
                        className="bg-dark text-light"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2" controlId="articleTitle">
                      <Form.Label className="text-light">Title:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="article title"
                        isValid={titleValid}
                        isInvalid={titleInvalid}
                        onChange={updateTitle}
                        value={articleTitle}
                        className="bg-dark text-light"
                      />
                      <FormText id="articleTitleHelpBlock" className="text-white">
                        Title must be at least 6 letters long.
                      </FormText>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-2" controlId="topicSelect">
                      <Form.Label className="text-light">Topic:</Form.Label>
                      <Form.Select
                        onChange={updateTopic}
                        value={articleTopic}
                        isValid={topicValid}
                        isInvalid={topicInvalid}
                        className={`bg-dark text-light ${articleTopic === "" ? "text-muted" : ""}`}
                      >
                        <option disabled value="">
                          Select a topic
                        </option>
                        <option>coding</option>
                        <option>cooking</option>
                        <option>football</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-2" controlId="articleImageURL">
                      <Form.Label className="text-light">Image:</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="image URL"
                          isValid={imageValid}
                          isInvalid={imageInvalid}
                          onChange={updateImage}
                          value={articleImage}
                          className="bg-dark text-light"
                        />
                        <Button variant="light" onClick={useDefaultImage} id="useDefaultImageBtn">
                          Use default
                        </Button>
                      </InputGroup>
                      <FormText id="articleFormHelpBlock" className="text-white">
                        URL must be a valid http address ending in .jpg or .png.
                      </FormText>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-2" controlId="articleBody">
                  <Form.Label className="text-light">Body:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="article body"
                    isValid={bodyValid}
                    isInvalid={bodyInvalid}
                    onChange={updateBody}
                    value={articleBody}
                    className="bg-dark text-light"
                  />
                  <FormText id="articleBodyHelpBlock" className="text-white">
                    Body must be at least 20 letters long.
                  </FormText>
                </Form.Group>

                <Form.Group className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostArticleForm;
