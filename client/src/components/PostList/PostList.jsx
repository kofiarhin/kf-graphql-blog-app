import PostItem from "../PostItem/PostItem";
import "./postList.scss";
const PostList = ({ data }) => {
  return (
    <div className="container post-container">
      <h1 className="heading">PostList</h1>
      {data.map((post) => {
        return <PostItem post={post} key={post._id} />;
      })}
    </div>
  );
};

export default PostList;
