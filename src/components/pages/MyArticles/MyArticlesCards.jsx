import styled from "styled-components";
import { UserContext } from "../../../contexts/User";
import { getArticles } from "../../../utils/apiRequest";
import { useContext, useState, useEffect } from "react";
import ArticleCardMini from "../Search/ArticleCardMini";
import Button from "react-bootstrap/Button";
import Loading from "../../loading/Loading";
import { deleteArticleById } from "../../../utils/apiRequest";
import { Link } from "react-router-dom";
import ErrorMessage from "../../modals/ErrorMessage";
import DeleteConfirmation from "../../modals/DeleteConfirmation";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [errorText, setErrorText] = useState("");
  const [deleteText, setDeleteText] = useState("");

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

  const deleteArticle = () => {
    const updatedArticles = usersArticles.filter((item) => {
      return item.article_id !== selectedArticle.article_id;
    });
    setUsersArticles(updatedArticles);
    deleteArticleById(selectedArticle.article_id)
    .catch((error) => {
      setErrorText(`Error: ${error.message}`);
      setShowEditModal(true);
    });
  };

  const deleteOnClickHandler = (article) => {
    setSelectedArticle(article);
    setDeleteText(
      `Are you sure you want to delete your article "${article.title}"?`
    );
    setShowDeleteModal(true);
  };

  const editOnClickHandler = () => {
    setErrorText(
      "Sorry, we're still in construction. Edit function coming soon!"
    );
    setShowEditModal(true);
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
        <ErrorMessage
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          errorMessage={errorText}
        />
        <DeleteConfirmation
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          deleteFunction={deleteArticle}
          deleteMessage={deleteText}
        />
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
                      setSelectedArticle(article);
                      editOnClickHandler();
                    }}
                    variant="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    className="rounded-0 rounded-bottom-2"
                    onClick={() => {
                      deleteOnClickHandler(article);
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
