import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gql/authMutaion";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, reset } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/profile");
    }
    dispatch(reset());
  }, [user, isSuccess, message]);

  const [loginMessage, setLoginMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "kofiarhin@gmail.com",
    password: "password",
  });

  const { email, password } = formData;

  const [loginUser] = useMutation(LOGIN_USER);

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

    try {
      const { data: loginData } = await loginUser({
        variables: {
          loginUserInput: {
            email,
            password,
          },
        },
      });

      if (loginData) {
        dispatch(loginSuccess(loginData.loginUser));
        localStorage.setItem("user", JSON.stringify(loginData));
        setLoginMessage = "";
      }
    } catch (error) {
      console.log(error.message);
      setLoginMessage(error.message);
    }
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
          <p className="error"> {loginMessage} </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
