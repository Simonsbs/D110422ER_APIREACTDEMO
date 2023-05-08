import { createContext, useEffect, useReducer } from "react";

export const Context = createContext();

const initState = {
  items: [],
  token: sessionStorage.getItem("token"),
  showProductForm: false,
  productToEdit: null,
  isLoading: false,
};

function getProductsFromAPI(state, dispatch) {
  dispatch({ type: "setIsLoading", payload: true });

  fetch("https://localhost:7175/api/Products", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: "setItems", payload: data });
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch({ type: "setIsLoading", payload: false });
    });
}

function reducer(state, action) {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case "setToken":
      sessionStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    case "setItems":
      return {
        ...state,
        items: action.payload,
      };
    case "addItem":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "removeItem":
      var i = state.items.indexOf(action.payload);
      if (i < 0) {
        return state;
      }
      return {
        ...state,
        items: state.items.splice(i, 1),
      };
    case "updateItem":
      var newState = { ...state };
      var i = state.items.indexOf(state.productToEdit);
      newState.items[i] = action.payload;

      console.log("i: " + i);
      console.log("action.payload: " + action.payload);
      return newState;
    case "toggleProductForm":
      return {
        ...state,
        productToEdit: null,
        showProductForm: !state.showProductForm,
      };
    case "setProductForm":
      return {
        ...state,
        productToEdit: null,
        showProductForm: action.payload,
      };
    case "setProductToEdit":
      return {
        ...state,
        productToEdit: action.payload,
        showProductForm: true,
      };
    case "setIsLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    getProductsFromAPI(state, dispatch);
  }, [state.token]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
export default Provider;
