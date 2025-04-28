import { Link } from "react-router-dom";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import NavBar from "./NavBar";
import apiUrl from "../utils/apiUrl";
import { UserContextType } from "../../types";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserForm.scss";

export const Register = ({ user, setUser }: UserContextType) => {
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, username: event.target.value });
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: event.target.value });
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: event.target.value });
  };

  const toastConfig: ToastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const onSubmitRegister = () => {
    fetch(`${apiUrl}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          toast.error("Email format is invalid", toastConfig);
        }
        if (res.status === 401) {
          toast.error(
            "Password should have 8 to 20 characters and at least 1 number",
            toastConfig
          );
        }
        if (res.status === 402) {
          toast.error("Username is already taken", toastConfig);
        }
        if (res.status === 403) {
          toast.error("Email is already taken", toastConfig);
        }
        if (res.status === 404) {
          toast.error("Username should have 3 to 20 characters", toastConfig);
        }
        if (res.status === 200) {
          toast.success("Registration successful", toastConfig);
        }
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setUser({
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            password: data.user.password,
            loggedIn: true,
          });
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register">
      <ToastContainer />
      <NavBar user={user} setUser={setUser} />
      <article className="main-content">
        <main className="form-container">
          <div className="form-content">
            <fieldset className="form-fieldset" id="sign_up">
              <legend className="form-legend">Register</legend>
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  onChange={onUsernameChange}
                  className="form-input"
                  type="text"
                  placeholder="username"
                  id="username"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className="form-input"
                  type="email"
                  placeholder="email-address"
                  id="email-address"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={onPasswordChange}
                  className="form-input"
                  type="password"
                  placeholder="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="form-button-container">
              <button
                onClick={onSubmitRegister}
                className="form-submit-button"
                type="submit"
                value="Register"
              >
                Submit
              </button>
            </div>
            <div className="link-container">
              <Link to="/login" className="link">
                Log In
              </Link>
            </div>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Register;
