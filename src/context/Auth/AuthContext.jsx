import React, { useReducer } from "react";
import MkdSDK from "Utils/MkdSDK";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  isLoading: true,
};

export const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      return {
        ...state,
        isAuthenticated: true,
        role: "admin",
        token: action?.payload?.token,
        user: action?.payload,
        isLoading: false,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        token: false,
        role: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + "admin" + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    const checkToken = async () => {
      try {
        const result = await sdk.check(role);

        if (result.error) {
          tokenExpireError(dispatch, result.message);
        } else {
          dispatch({ type: "LOGIN" });
        }
      } catch (error) {
        tokenExpireError(
          dispatch,
          "Token verification failed. Please log in again."
        );
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
