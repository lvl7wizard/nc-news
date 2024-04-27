import { useState, useContext } from "react";
import { UserContext } from "../../../contexts/User";
import StyledForm from "../../forms/StyledForm";
import styled from "styled-components";
import isValidUrl from "../../../utils/isValidUrl";
import hasImgExtension from "../../../utils/hasImgExtension";
import { postArticle } from "../../../utils/apiRequest";
import { Navigate } from "react-router-dom";

const FormContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 55px);
min-height: 520px;
`

const Post = () => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    author: currentUser.username,
    title: "",
    body: "",
    topic: "",
    image: "",
    errors: {},
    loading: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      // set loading state
      setFormData((prevState) => ({ ...prevState, loading: true }));
      // create request body
      const requestBody = {
        author: formData.author,
        title: formData.title,
        body: formData.body,
        topic: formData.topic,
        article_img_url: formData.image
      }
      // send post request
      try {
        const response = await postArticle(requestBody);
        // redirect on successful response
        return <Navigate to={`/article/${response.data.id}`} replace />;
      } catch (error) {
        console.error(error);
        // handle errors appropriately, update state if needed
      } finally {
        setFormData({ ...formData, loading: false });
      }
    } else {
      // Form is invalid, do nothing
      console.log(formData, "form was not validated");
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check if title is empty
    if (formData.title.length < 5) {
      errors.title = "Title must be at least 5 characters";
    }

    // Check if body is empty
    if (formData.body.length < 20) {
      errors.body = "Body must be at least 20 characters";
    }

    // Check if string is empty
    if (!formData.image) {
      errors.image = "Image URL is required";
      // check if string is a valid URL
    } else {
      if (!isValidUrl(formData.image)) {
        errors.image = "Image URL is not valid"
      } else {
        if (!hasImgExtension(formData.image)) {
          errors.image = "Image must be a JPG or PNG"
        }
      }
    }

    // Update formData state to include errors
    setFormData((prevState) => ({ ...prevState, errors }));

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  return (
    <FormContainer>
    <StyledForm
      style={{ display: "flex", flexDirection: "column", height: "auto" }}
      onSubmit={handleSubmit}
      >
        <h2>Post An Article</h2>
      <p>Author: {currentUser.username}</p>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          />
        {formData.errors.title && (
            <p style={{ color: "red" }}>{formData.errors.title}</p>
        )}
      </label>
      <label>
        Topic:
        <select onChange={handleChange} name="topic">
          <option>coding</option>
          <option>football</option>
          <option>cooking</option>
        </select>
      </label>
      <label>
        Body:
        <textarea
          name="body"
          value={formData.body}
          rows="5"
          onChange={handleChange}
          />
        {formData.errors.body && (
            <p style={{ color: "red" }}>{formData.errors.body}</p>
        )}
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          />
        {formData.errors.image && (
            <p style={{ color: "red" }}>{formData.errors.image}</p>
        )}
      </label>
      <input type="submit" value="Submit" />
      {formData.loading && (
          <p style={{ marginTop: 5, fontWeight: "bold" }}>Loading...</p>
        )}
    </StyledForm>
        </FormContainer>
  );
};

export default Post;
