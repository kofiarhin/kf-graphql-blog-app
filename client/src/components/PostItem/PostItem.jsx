import { Link } from "react-router-dom";
import "./postItem.scss";
const PostItem = ({ post }) => {
  return (
    <div className="post-unit">
      <p className="name"> {post.user.name} </p>
      <h2> {post.title.substring(0, 50)} </h2>
      <Link to={`/posts/${post._id}`}>
        <p> {post.body.substring(0, 100)} </p>
      </Link>
    </div>
  );
};

export default PostItem;
