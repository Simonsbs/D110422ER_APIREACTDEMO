import { useContext } from "react";
import { Context } from "../Context";

export default function NavBar() {
  const { state, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "setToken", payload: null });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#0">
          My Shop
        </a>
        <button className="btn btn-outline-success" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
