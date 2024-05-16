import styled from "styled-components";
import { UserContext } from "../../../contexts/User";
import { getArticles } from "../../../utils/apiRequest";
import { useContext, useState, useEffect } from "react";
import ArticleCardMini from "../Search/ArticleCardMini";
import Button from "react-bootstrap/Button";
import Loading from "../../loading/Loading";
import { deleteArticleById } from "../../../utils/apiRequest";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const LoadingContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  align-items: center;
`;

const MyArticlesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const MyArticleCards = () => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [usersArticles, setUsersArticles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [selectedArticle, setSelectedArticle] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticles().then((response) => {
      const articles = response.filter(
        (article) => article.author === currentUser.username
      );
      setUsersArticles(articles);
      setIsLoading(false);
    });
  }, [currentUser]);

  const deleteOnClickHandler = (article_id) => {
    const updatedArticles = usersArticles.filter((item) => {
      return item.article_id !== article_id;
    });
    setUsersArticles(updatedArticles);
    deleteArticleById(article_id).catch((error) => {
      window.alert(`Delete request was unsuccessful.`);
    });
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  } else {
    return (
      <>
        <p>
          You are currently logged in as <strong>{currentUser.username}</strong>
          .{" "}
        </p>
        <p>
          Click the buttons below to <span className="text-success">view</span>,{" "}
          <span className="text-warning">edit</span>, or{" "}
          <span className="text-danger">delete</span> your articles
        </p>

        {/* edit article pop up modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header
            closeButton
            className="border-bottom border-secondary bg-warning"
          >
            <Modal.Title className="text-dark">Edit Article</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-light bg-dark">
            🚧 Sorry, we're still in construction 🚧. Edit function coming soon!
          </Modal.Body>
          <Modal.Footer className="border-top bg-dark">
            <Button
              variant="outline-secondary"
              onClick={handleCloseEditModal}
              className="text-light"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* delete article pop up modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header
            closeButton
            className="border-bottom border-secondary bg-danger"
          >
            <Modal.Title className="text-light">Delete Article</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-light bg-dark">
            Are you sure you want to delete your article "
            {selectedArticle.title}"?
          </Modal.Body>
          <Modal.Footer className="border-top bg-dark">
            <Button
              variant="outline-secondary"
              onClick={handleCloseDeleteModal}
              className="text-light"
            >
              No
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                deleteOnClickHandler(selectedArticle.article_id);
                handleCloseDeleteModal();
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <MyArticlesContainer>
          {usersArticles.map((article) => {
            return (
              <div key={article.article_id}>
                <ArticleCardMini article={article} />
                <ButtonContainer>
                  <Link
                    to={`/articles/${article.article_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="success"
                      className="rounded-0 rounded-bottom-2"
                    >
                      View
                    </Button>
                  </Link>
                  <Button
                    className="rounded-0 rounded-bottom-2"
                    onClick={() => {
                      handleShowEditModal();
                      setSelectedArticle(article);
                    }}
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    className="rounded-0 rounded-bottom-2"
                    onClick={() => {
                      handleShowDeleteModal();
                      setSelectedArticle(article);
                    }}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </ButtonContainer>
              </div>
            );
          })}
        </MyArticlesContainer>
      </>
    );
  }
};

export default MyArticleCards;
