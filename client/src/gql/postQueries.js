import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query PostQuery {
    posts {
      _id
      title
      body
      user_id
      user {
        name
        email
      }
    }
  }
`;

const GET_POST = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      _id
      title
      body
      user_id
      user {
        _id
        name
        email
      }
    }
  }
`;

export { GET_POST, GET_POSTS };
