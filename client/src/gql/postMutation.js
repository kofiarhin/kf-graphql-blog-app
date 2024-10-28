import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePostMutation($createPostInput: CreatePostInput) {
    createPost(createPostInput: $createPostInput) {
      title
      body
      createdAt
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
      _id
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePostMutation($id: ID!, $updatePostInput: UpdatePostInput) {
    updatePost(id: $id, updatePostInput: $updatePostInput) {
      title
      body
    }
  }
`;
export { CREATE_POST, DELETE_POST, UPDATE_POST };
