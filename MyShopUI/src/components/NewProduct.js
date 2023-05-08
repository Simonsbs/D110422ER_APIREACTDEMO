import { useContext, useEffect, useRef } from "react";
import { Context } from "../Context";

export default function NewProduct() {
  const { state, dispatch } = useContext(Context);
  const inputName = useRef(null);
  const inputDescription = useRef(null);

  useEffect(() => {
    if (state.productToEdit) {
      inputName.current.value = state.productToEdit.name;
      inputDescription.current.value = state.productToEdit.description;
    }
  }, [state.productToEdit]);

  const handleSave = (e) => {
    e.preventDefault();

    var item = {
      id: state.productToEdit ? state.productToEdit.id : 0,
      name: inputName.current.value,
      description: inputDescription.current.value,
    };

    fetch("https://localhost:7175/api/Products", {
      method: state.productToEdit ? "put" : "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        if (state.productToEdit) {
          return response;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (state.productToEdit) {
          dispatch({ type: "updateItem", payload: item });
        } else {
          dispatch({ type: "addItem", payload: data });
        }
        dispatch({ type: "setProductForm", payload: false });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return [
    state.showProductForm && (
      <div className="container" key="1">
        <h2>{state.productToEdit ? "Edit" : "New"} Product</h2>
        <form onSubmit={handleSave}>
          <div className="row mb-3">
            <label htmlFor="Name" className="col-sm-2 col-form-label">
              Name:
            </label>
            <div className="col-sm-2">
              <input
                type="text"
                ref={inputName}
                className="form-control"
                id="Name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Description" className="col-sm-2 col-form-label">
              Description:
            </label>
            <div className="col-sm-2">
              <input
                type="text"
                ref={inputDescription}
                className="form-control"
                id="Description"
              />
            </div>
          </div>
          <div className="mb-2">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    ),
    <button
      key="2"
      className="btn btn-success"
      onClick={() => dispatch({ type: "toggleProductForm" })}
    >
      {state.showProductForm ? "Cancel" : "+Add"}
    </button>,
  ];
}
