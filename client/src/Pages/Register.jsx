import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { USERS_QUERY } from "../gql/authQuerires";
import { CREATE_USER } from "../gql/authMutaion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setRegisterError("");

    try {
      const dataToSubmit = {
        name,
        email,
        password,
      };

      const { data: registerData } = await createUser({
        variables: {
          userInput: {
            name,
            email,
            password,
          },
        },
      });

      if (registerData) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      // E1100 duplicate key
      if (error.message.includes("E11000 duplicate key")) {
        setRegisterError("Email already taken");
      } else if (error.message.includes("User validation failed")) {
        setRegisterError("please fill out all fields");
      }
    }
  };
  return (
    <div>
      <h1 className="heading">Register User</h1>

      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={handleChange}
            />
          </div>

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
          <p className="error"> {registerError} </p>
          <button type="submit">Rgister</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
