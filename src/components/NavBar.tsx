import { Link, useNavigate } from "react-router-dom";
import { UserContextType } from "../../types";
import Logo from "../assets/brain.png";
import "../styles/NavBar.scss";

const NavBar = ({ user, setUser }: UserContextType) => {
  const navigate = useNavigate();

  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({
      id: "",
      username: "",
      email: "",
      password: "",
      loggedIn: false,
    });
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="link">
            <img src={Logo} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="navbar-username">
          {user.loggedIn && (
            <p className="username-text">👋 user: {user.username}</p>
          )}
        </div>
        <div className="navbar-sign-out">
          {user.loggedIn && (
            <button onClick={onSignOut} className="sign-out-button">
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
