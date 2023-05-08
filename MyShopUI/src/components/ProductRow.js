import { useContext } from "react";
import { Context } from "../Context";

export default function ProductRow({ product }) {
  const { state, dispatch } = useContext(Context);

  const handleEdit = () => {
    dispatch({ type: "setProductToEdit", payload: product });
  };

  const handleDelete = (e) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    fetch(`https://localhost:7175/api/Products/${product.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response;
      })
      .then((data) => {
        dispatch({ type: "removeItem", payload: product });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </td>
      <td>
        <button className="btn btn-warning" onClick={handleEdit}>
          Edit
        </button>
      </td>
    </tr>
  );
}
