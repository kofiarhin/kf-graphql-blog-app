import "./header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };
  return (
    <div>
      <header className="header">
        <div className="container">
          <Link>
            {" "}
            <h1>Logo</h1>
          </Link>

          <nav>
            {user ? (
              <>
                <Link to="/posts">Posts</Link>
                <Link to="/posts/create">Create Post</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
