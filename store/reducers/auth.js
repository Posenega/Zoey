import {
  AUTH_SUCCESS,
  LOGOUT,
  TRY_AUTO_LOGIN_FAIL,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  GET_USER,
  SET_VERIFY_USER,
  AUTH_SET_LOADING,
  AUTH_STOP_LOADING,
  TRY_AUTO_LOGIN_START,
  SET_SOCKET,
} from "../actions/auth";

const initialState = {
  token: "",
  email: "",
  firstName: "",
  lastName: "",
  userId: "",
  type: "",
  tryAutoLogin: false,
  imageUrl: "",
  isVerify: false,
  isLoading: false,
  socket: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRY_AUTO_LOGIN_START:
      return { ...state, tryAutoLogin: true, isLoading: false };
    case AUTH_SET_LOADING:
      return { ...state, isLoading: true };
    case AUTH_STOP_LOADING:
      return { ...state, isLoading: false };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        userId: action.userId,
        imageUrl: action.imageUrl,
        type: action.userType,
        tryAutoLogin: false,
        isVerify: false,
        isLoading: false,
      };

    case TRY_AUTO_LOGIN_FAIL:
      return { ...state, tryAutoLogin: false };

    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.updatedState, isLoading: false };
    case SET_SOCKET:
      return { ...state, socket: action.socket };
    case SET_VERIFY_USER:
      return {
        ...initialState,
        email: action.email,
        isVerify: true,
        tryAutoLogin: false,
        userId: action.userId,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
