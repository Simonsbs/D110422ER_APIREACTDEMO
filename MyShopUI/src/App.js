import { useContext } from "react";
import "./App.css";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NewProduct from "./components/NewProduct";
import ProductsTable from "./components/ProductsTable";
import { Context } from "./Context";

function App() {
  const { state, dispatch } = useContext(Context);

  return (
    <>
      <NavBar />
      {!state.token ? (
        <Login />
      ) : (
        <div className="container text-center mt-5">
          <h1>My Products</h1>
          <NewProduct />
          <ProductsTable />
        </div>
      )}
    </>
  );
}

export default App;
