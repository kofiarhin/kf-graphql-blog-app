import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../gql/authMutaion";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
``;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "kofiarhin@gmail.com",
    password: "password",
  });

  const { email, password } = formData;

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(USERS_QUERY);

  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: USERS_QUERY }], // Refetch the users query after the mutation
  });

  const [
    loginUser,
    { loading: loginLoading, data: loginData, error: loginError },
  ] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      email,
      password,
    };

    const { data: loginData } = await loginUser({
      variables: {
        loginUserInput: {
          email,
          password,
        },
      },
    });

    if (loginData) {
      console.log("login success", loginData.loginUser);
      dispatch(loginSuccess(loginData.loginUser));
      navigate("/profile");
    }

    // createUser({
    //   variables: {
    //     userInput: {
    //       name,
    //       email,
    //       password,
    //     },
    //   },
    // });
  };
  return (
    <div>
      <h1 className="heading"> Login</h1>

      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
