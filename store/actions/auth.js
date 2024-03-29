import axios from "axios";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

export const SIGNUP_USER = "SIGNUP_USER";
export const AUTH_SET_LOADING = "AUTH_SET_LOADING";
export const AUTH_STOP_LOADING = "AUTH_STOP_LOADING";

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const LOGIN_USER = "LOGIN_USER";
export const TRY_AUTO_LOGIN_START = "TRY_AUTO_LOGIN_START";
export const TRY_AUTO_LOGIN_FAIL = "TRY_AUTO_LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const GET_USER = "GET_USER";
export const SET_VERIFY_USER = "SET_VERIFY_USER";
export const SET_SOCKET = "SET_SOCKET";

const authUser = (
  authMode,
  dispatch,
  firstName,
  lastName,
  email,
  password,
  city,
  setError
) => {
  dispatch(authSetLoading());
  axios
    .post(`/api/users/${authMode === "SIGN_UP" ? "signup" : "login"}`, {
      firstName,
      lastName,
      email,
      password,
      city,
    })
    .then((res) => {
      const {
        token,
        email,
        firstName,
        lastName,
        userId,
        image,
        type: userType,
        isStudent,
        grade,
      } = res.data;

      SecureStore.setItemAsync(
        "userData",
        JSON.stringify({
          token,
          email,
          firstName,
          lastName,
          userId,
          image,
          userType,
          isStudent,
          grade,
        })
      )
        .then(() => {
          if (!token) {
            dispatch(setVerifyUser(email, userId));
          } else {
            dispatch(
              authSuccess(
                token,
                email,
                firstName,
                lastName,
                userId,
                image,
                userType,
                isStudent,
                grade
              )
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      dispatch(authStopLoading());
      if (setError) {
        setError(authMode === "SIGN_UP" ? "city" : "password", {
          type: "server",
          message: e.response?.data?.message || "Unknown error has occured.",
        });
      }
    });
};

export const authSetLoading = () => {
  return {
    type: AUTH_SET_LOADING,
  };
};

export const authStopLoading = () => {
  return {
    type: AUTH_STOP_LOADING,
  };
};

const authSuccess = (
  token,
  email,
  firstName,
  lastName,
  userId,
  image,
  userType,
  isStudent,
  grade
) => {
  console.log(userType);
  return {
    type: AUTH_SUCCESS,
    token,
    email,
    firstName,
    lastName,
    userId,
    image,
    userType: userType || "user",
    isStudent,
    grade,
  };
};

export const signupUser = (
  firstName,
  lastName,
  email,
  password,
  city,
  setError
) => {
  return (dispatch, getState) => {
    authUser(
      "SIGN_UP",
      dispatch,
      firstName,
      lastName,
      email,
      password,
      city,
      setError
    );
  };
};

export const loginUser = (email, password, setError) => {
  return (dispatch, getState) => {
    authUser("LOG_IN", dispatch, null, null, email, password, null, setError);
  };
};

export const tryAutoLogin = () => {
  return async (dispatch, getState) => {
    dispatch(tryAutoLoginStart());
    const userData = await SecureStore.getItemAsync("userData");
    if (userData) {
      const {
        token,
        email,
        firstName,
        lastName,
        userId,
        image,
        userType,
        isStudent,
        grade,
      } = JSON.parse(userData);

      if (!token) {
        dispatch(setVerifyUser(email, userId));
      } else {
        dispatch(
          authSuccess(
            token,
            email,
            firstName,
            lastName,
            userId,
            image,
            userType,
            isStudent,
            grade
          )
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
    try {
      const token = getState().auth.token;
      await SecureStore.deleteItemAsync("userData");
      await axios({
        method: "patch",
        url: "/api/users/update",
        data: { expoPushToken: " " },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      dispatch({ type: LOGOUT });
    }
  };
};

const tryAutoLoginStart = () => {
  return { type: TRY_AUTO_LOGIN_START };
};

const tryAutoLoginFail = () => {
  return { type: TRY_AUTO_LOGIN_FAIL };
};

export const uploadExpoPushToken = (expoPushToken) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      await axios({
        method: "patch",
        url: "/api/users/update",
        data: { expoPushToken },
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return Promise.resolve();
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateUser = (
  { localUrl, firstName, lastName, oldPassword, newPassword, isStudent, grade },
  setError,
  goBack
) => {
  return (dispatch, getState) => {
    dispatch(authSetLoading());
    const token = getState().auth.token;
    let formData = new FormData();

    if (localUrl) {
      let filename = localUrl.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let fileType = match ? `image/${match[1]}` : `image`;
      formData.append("imageUrl", {
        uri: localUrl,
        name: filename,
        type: fileType,
      });
    }

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    oldPassword === undefined
      ? null
      : formData.append("old_password", oldPassword);
    newPassword === undefined
      ? null
      : formData.append("new_password", newPassword);

    isStudent !== undefined && formData.append("isStudent", isStudent);
    grade && formData.append("grade", grade);

    axios({
      method: "patch",
      url: "/api/users/update",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        const { firstName, lastName, image, isStudent, grade } = response.data;
        const { token, email, userId } = getState().auth;
        SecureStore.setItemAsync(
          "userData",
          JSON.stringify({
            token,
            email,
            firstName,
            lastName,
            userId,
            image,
            isStudent,
            grade,
          })
        );
        dispatch(
          updateUserSuccess(firstName, lastName, image, isStudent, grade)
        );
        goBack();
      })
      .catch((e) => {
        console.log("error");
        dispatch(authStopLoading());
        setError("oldPassword", {
          type: "server",
          message: e.response.data?.message || "Unknown error has occured.",
        });
      });
  };
};

export const updateUserSuccess = (
  firstName,
  lastName,
  image,
  isStudent,
  grade
) => {
  const updatedState = { firstName, lastName, isStudent, grade };
  if (image) updatedState.image = image;
  return {
    type: UPDATE_USER_SUCCESS,
    updatedState,
  };
};

export const verifyUser = (confirmationCode, setError) => {
  return (dispatch, getState) => {
    dispatch(authSetLoading());
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
          image,
        } = response.data.user;
        SecureStore.setItemAsync(
          "userData",
          JSON.stringify({
            token: response.data.token,
            email,
            firstName,
            lastName,
            userId,
            image,
          })
        ).then(() => {
          dispatch(
            authSuccess(
              response.data.token,
              email,
              firstName,
              lastName,
              userId,
              image
            )
          );
        });
      })
      .catch((e) => {
        dispatch(authStopLoading());
        setError("code", {
          type: "server",
          message: e.response?.data?.message || "Unknown error has occured.",
        });
      });
  };
};

export const setSocket = (socket) => {
  return { type: SET_SOCKET, socket };
};
