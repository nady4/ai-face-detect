import { Link } from "react-router-dom";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import apiUrl from "../utils/apiUrl";
import NavBar from "./NavBar";
import { UserContextType } from "../../types";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserForm.scss";

export const Login = ({ user, setUser }: UserContextType) => {
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

  const onSubmitLogin = () => {
    fetch(`${apiUrl}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          toast.error("Email not found", toastConfig);
        }
        if (res.status === 401) {
          toast.error("Password incorrect", toastConfig);
        }
        if (res.status === 200) {
          toast.success("Login successful", toastConfig);
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
    <div className="login">
      <ToastContainer />
      <NavBar user={user} setUser={setUser} />
      <article className="main-content">
        <main className="form-container">
          <div className="form-content">
            <fieldset className="form-fieldset" id="sign_up">
              <legend className="form-legend">Log In</legend>
              <div className="form-group">
                <label className="form-label" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={onEmailChange}
                  className="form-input"
                  type="email"
                  name="email-address"
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
                  name="password"
                  id="password"
                />
              </div>
              <div className="form-button-container">
                <button
                  onClick={onSubmitLogin}
                  className="form-submit-button"
                  type="submit"
                  value="Log In"
                >
                  Enter
                </button>
              </div>
            </fieldset>
            <div className="link-container">
              <Link to="/register" className="link">
                Register
              </Link>
            </div>
          </div>
        </main>
        <div className="test-login-data-container">
          <p className="test-login-data">
            If you want to test the app use these credentials
          </p>
          <p className="test-login-data">Email: test@gmail.com</p>
          <p className="test-login-data">Password: Test1234</p>
        </div>
      </article>
    </div>
  );
};

export default Login;
