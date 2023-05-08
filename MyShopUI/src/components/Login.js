import { useContext, useRef } from "react";
import { Context } from "../Context";

export default function Login() {
  const { state, dispatch } = useContext(Context);
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("https://localhost:7175/api/Authentication", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: inputUsername.current.value,
        password: inputPassword.current.value,
      }),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error(result.status);
        }
        return result.text();
      })
      .then((data) => {
        console.log("Token: " + data);
        dispatch({ type: "setToken", payload: data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="row mb-3">
          <label htmlFor="Username" className="col-sm-2 col-form-label">
            Username:
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              ref={inputUsername}
              className="form-control"
              id="Username"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="Password" className="col-sm-2 col-form-label">
            Password:
          </label>
          <div className="col-sm-2">
            <input
              type="Password"
              ref={inputPassword}
              className="form-control"
              id="Password"
            />
          </div>
        </div>
        <div className="mb-2">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
