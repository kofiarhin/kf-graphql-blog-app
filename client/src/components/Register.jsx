import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

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

const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      name
      email
      password
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "another one",
    email: "testtesttest@gmail.com",
    password: "password",
  });

  const { name, email, password } = formData;

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(USERS_QUERY);

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: USERS_QUERY }], // Refetch the users query after the mutation
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      name,
      email,
      password,
    };

    createUser({
      variables: {
        userInput: {
          name,
          email,
          password,
        },
      },
    });
  };
  return (
    <div>
      <h1>Register User</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleChange}
        />
        <button type="submit">Rgister</button>
      </form>
    </div>
  );
};

export default Register;
