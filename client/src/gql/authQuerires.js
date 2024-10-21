import { gql } from "@apollo/client";

const USERS_QUERY = gql`
  query UsersQuery {
    users {
      name
      email
      password
      posts {
        title
        body
      }
    }
  }
`;

export { USERS_QUERY };
