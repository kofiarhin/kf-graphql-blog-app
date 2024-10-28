import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POSTS, GET_POST } from "../gql/postQueries";
import { useSelector } from "react-redux";
import { DELETE_POST } from "../gql/postMutation";
import { useNavigate, Link } from "react-router-dom";

// delete
const Post = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [deletePost] = useMutation(DELETE_POST);
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });

  if (error) return <h1 className="heading">Something went wrong</h1>;

  if (loading) return <h1 className="heading">Loading....</h1>;

  const handleDelete = async () => {
    try {
      const res = await deletePost({
        variables: {
          id,
        },
        refetchQueries: [{ query: GET_POSTS }],
      });
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container post">
      <h1> {data.post?.title} </h1>
      <p className="text"> {data.post?.body} </p>
      {user && user._id === data.post.user_id ? (
        <>
          <button className="btn btn-delete mg-right" onClick={handleDelete}>
            Delete Post
          </button>
          <Link to={`/posts/edit/${data.post._id}`} className="btn btn-primary">
            Edit
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default Post;
