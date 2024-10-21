import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div>
      <h1 className="heading">
        {" "}
        Welcome <span>{user?.name}</span>{" "}
      </h1>
    </div>
  );
};

export default Profile;
