import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from "../gql/postMutation";
import { postSuccess } from "../redux/post/postSlice";
import { useDispatch } from "react-redux";
import { GET_POSTS } from "../gql/postQueries";
const CreatePost = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createPost] = useMutation(CREATE_POST);

  //   check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    title: "ext ever since the 1500s, when",
    body: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ma",
  });

  const { body, title } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      title,
      body,
    };

    try {
      const { data } = await createPost({
        variables: {
          createPostInput: {
            ...dataToSubmit,
          },
        },
        refetchQueries: [{ query: GET_POSTS }],
      });
      dispatch(postSuccess(data.posts));
      navigate("/posts");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className="heading">Create Post</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="title"
              onChange={handleChange}
              placeholder="Enter Title"
              name="title"
              value={title}
            />
          </div>

          <div className="input-group">
            <label htmlFor="body">Body</label>
            <textarea
              name="body"
              placeholder="Enter Post details here"
              value={body}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
