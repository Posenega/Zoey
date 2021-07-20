import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const SIGNUP_USER = "SIGNUP_USER";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const LOGIN_USER = "LOGIN_USER";
export const TRY_AUTO_LOGIN = "TRY_AUTO_LOGIN";
export const TRY_AUTO_LOGIN_FAIL = "TRY_AUTO_LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const GET_USER = "GET_USER";
export const SET_VERIFY_USER = "SET_VERIFY_USER";

const authUser = (
  authMode,
  dispatch,
  firstName,
  lastName,
  email,
  password,
  setError
) => {
  axios
    .post(`/api/users/${authMode === "SIGN_UP" ? "signup" : "login"}`, {
      firstName,
      lastName,
      email,
      password,
    })
    .then((res) => {
      const { token, email, firstName, lastName, userId, imageUrl } = res.data;
      SecureStore.setItemAsync(
        "userData",
        JSON.stringify({
          token,
          email,
          firstName,
          lastName,
          userId,
          imageUrl,
        })
      )
        .then(() => {
          if (!token) {
            dispatch(setVerifyUser(email, userId));
          } else {
            dispatch(
              authSuccess(token, email, firstName, lastName, userId, imageUrl)
            );
          }
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => {
      if (setError) {
        setError("password", {
          type: "server",
          message: e.response.data?.message || "Unknown error has occured.",
        });
      }
    });
};
const authSuccess = (token, email, firstName, lastName, userId, imageUrl) => {
  return {
    type: AUTH_SUCCESS,
    token,
    email,
    firstName,
    lastName,
    userId,
    imageUrl,
  };
};

export const signupUser = (firstName, lastName, email, password, userId) => {
  return (dispatch, getState) => {
    authUser("SIGN_UP", dispatch, firstName, lastName, email, password);
  };
};

export const loginUser = (email, password, setError) => {
  return (dispatch, getState) => {
    authUser("LOG_IN", dispatch, null, null, email, password, setError);
  };
};

export const tryAutoLogin = () => {
  return async (dispatch, getState) => {
    const userData = await SecureStore.getItemAsync("userData");
    if (userData) {
      const { token, email, firstName, lastName, userId, imageUrl } =
        JSON.parse(userData);

      if (!token) {
        dispatch(setVerifyUser(email, userId));
      } else {
        dispatch(
          authSuccess(token, email, firstName, lastName, userId, imageUrl)
        );
      }
    } else {
      dispatch(tryAutoLoginFail());
    }
  };
};

export const setVerifyUser = (email, userId) => {
  return { type: SET_VERIFY_USER, email, userId };
};

export const logout = () => {
  return async (dispatch, getState) => {
    await SecureStore.deleteItemAsync("userData");
    dispatch({ type: LOGOUT });
  };
};

const tryAutoLoginFail = () => {
  return { type: TRY_AUTO_LOGIN_FAIL };
};

export const updateUser = (data) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    dispatch({ type: UPDATE_USER_START });
    axios({
      method: "patch",
      url: "/api/users/update",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      const { firstName, lastName, imageUrl } = response.data;
      const { token, email, userId } = getState().auth;
      SecureStore.setItemAsync(
        "userData",
        JSON.stringify({
          token,
          email,
          firstName,
          lastName,
          userId,
          imageUrl,
        })
      );
      dispatch(updateUserSuccess(firstName, lastName, imageUrl));
    });
  };
};

export const updateUserSuccess = (firstName, lastName, imageUrl) => {
  const updatedState = { firstName, lastName };
  if (imageUrl) updatedState.imageUrl = imageUrl;
  return {
    type: UPDATE_USER_SUCCESS,
    updatedState,
  };
};

export const verifyUser = (confirmationCode, setError) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    axios({
      method: "POST",
      url: `/api/users/${userId}/confirm`,
      data: {
        confirmationCode,
      },
    })
      .then((response) => {
        const {
          email,
          firstName,
          lastName,
          _id: userId,
          imageUrl,
        } = response.data.user;
        SecureStore.setItemAsync(
          "userData",
          JSON.stringify({
            token: response.data.token,
            email,
            firstName,
            lastName,
            userId,
            imageUrl,
          })
        ).then(() => {
          dispatch(
            authSuccess(
              response.data.token,
              email,
              firstName,
              lastName,
              userId,
              imageUrl
            )
          );
        });
      })
      .catch((e) => {
        setError("code", {
          type: "server",
          message: e.response?.data?.message || "Unknown error has occured.",
        });
      });
  };
};
