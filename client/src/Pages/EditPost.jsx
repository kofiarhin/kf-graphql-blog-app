import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_POST, GET_POSTS } from "../gql/postQueries";
import { useParams } from "react-router-dom";
import { UPDATE_POST } from "../gql/postMutation";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatePost] = useMutation(UPDATE_POST);
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
  });
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.post.title,
        body: data.post.body,
      });
    }
  }, [data]);

  const { title, body } = formData;
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = (title, body);
    console.log(dataToSubmit);
    try {
      await updatePost({
        variables: {
          id,
          updatePostInput: {
            title,
            body,
          },
        },
        refetchQueries: [{ query: GET_POSTS }],
      });
      navigate("/posts");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h1 className="heading">Edit Post</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={title}
            />
          </div>
          <div className="input-group">
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              value={body}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
