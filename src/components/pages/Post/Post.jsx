import { useState, useContext } from "react";
import { UserContext } from "../../../contexts/User";
import styled from "styled-components";
import isValidUrl from "../../../utils/isValidUrl";
import hasImgExtension from "../../../utils/hasImgExtension";
import { postArticle } from "../../../utils/apiRequest";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 80px);
min-height: 520px;

h2 {
  padding:0;
  margin: 0;
}

p {
  padding: 0;
  margin: 0;
}
`

const PostForm = styled.form`
background: rgba(255, 255, 255, 0.1);
display: flex;
flex-direction: column;
text-align: center;
gap: 20px;
padding: 20px;
border-radius: 25px;
select {
  border: none;
  border-radius: 4px;
  background-color: black;
  color: white;
}

input {
background-color: rgba(0, 0, 0, 0.7);
color: white;
border: solid grey 1px;
width: 40vw;
max-width: 288px;
align-self: center;
}

textarea {
background-color: black;
color: white;
width: 70vw;
max-width: 500px;
height: 20vh;
}

color: white;
`

const SubmitButton = styled.input`
background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 25px;
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: opacity 0.2s ease;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  font-size: 20px;
  
  &:hover {
    outline: solid white;
    border-radius: 25px;
  }
`

const Post = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author: currentUser.username,
    title: "",
    body: "",
    topic: "coding",
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
        navigate(`/articles/${response.data.article.article_id}`);
        // navigation.navigate(`/articles/${response.data.article.article_id}`)
      } catch (error) {
        // console.error(error);
        // handle errors appropriately, update state if needed
      } finally {
        setFormData({ ...formData, loading: false });
      }
    } else {
      // Form is invalid, do nothing
      // console.log(formData, "form was not validated");
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
    <PostForm
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
        <div>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          />
        {formData.errors.body && (
            <p style={{ color: "red" }}>{formData.errors.body}</p>
        )}
        </div>
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
      <SubmitButton type="submit" value="Submit" />
      {formData.loading && (
          <p style={{ marginTop: 5, fontWeight: "bold" }}>Loading...</p>
        )}
    </PostForm>
        </FormContainer>
  );
};

export default Post;
