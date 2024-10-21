import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LoginUserMutation($loginUserInput: LoginUserInput) {
    loginUser(loginUserInput: $loginUserInput) {
      name
      email
      token
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      name
      email
      password
    }
  }
`;

export { LOGIN_USER, CREATE_USER };
