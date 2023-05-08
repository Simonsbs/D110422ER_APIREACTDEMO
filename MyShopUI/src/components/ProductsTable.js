import { useContext } from "react";
import { Context } from "../Context";
import ProductRow from "./ProductRow";

export default function ProductsTable() {
  const { state, dispatch } = useContext(Context);

  return state.isLoading ? (
    <h2>Loading...</h2>
  ) : state.items.length === 0 ? (
    <h2>No data</h2>
  ) : (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {state.items.map((product) => {
          return <ProductRow product={product} key={product.id} />;
        })}
      </tbody>
    </table>
  );
}
