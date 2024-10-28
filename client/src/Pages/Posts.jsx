import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../gql/postQueries";
import PostList from "../components/PostList/PostList";

// posts
const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (data) {
    console.log(data.posts.length);
  }

  if (error) {
    return (
      <>
        <h1 className="heading">Something went wrong</h1>
      </>
    );
  }

  if (loading)
    return (
      <>
        <h1 className="heading">Loading....</h1>
      </>
    );

  return (
    <div>{data && data.posts.length > 0 && <PostList data={data.posts} />}</div>
  );
};

export default Posts;
