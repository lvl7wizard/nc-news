import { useState, useContext } from "react";
import { UserContext } from "../../../contexts/User";
import StyledForm from "../../forms/StyledForm";
import styled from "styled-components";

const FormContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 55px);
`

const Post = () => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    author: currentUser.username,
    title: "",
    topic: "",
    body: "",
    image: "",
    errors: {},
    loading: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid
      // set loading state

      setFormData((prevState) => ({ ...prevState, loading: true }));
      console.log(formData, "loading started");
      // simulating loading time
      setTimeout(() => {
        setFormData({ ...formData, loading: false });
        setFormData((prevState) => ({ ...prevState, errors: {} }));
        console.log(formData, "loading finished");
      }, 2000);
    } else {
      // Form is invalid, do nothing
      console.log(formData, "form was not validated");
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check if title is empty
    if (!formData.title) {
      errors.title = "Username is required";
    }

    // Check if body is empty
    if (!formData.body) {
      errors.body = "Body is required";
    }

    // Check if image URL is empty
    if (!formData.image) {
      errors.image = "Image URL is required";
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
        <input
          type="text"
          name="body"
          value={formData.body}
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
