import {
  AUTH_SUCCESS,
  LOGOUT,
  TRY_AUTO_LOGIN_FAIL,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  GET_USER,
  SET_VERIFY_USER,
} from "../actions/auth";

const initialState = {
  token: "",
  email: "",
  firstName: "",
  lastName: "",
  userId: "",
  tryAutoLogin: true,
  imageUrl: "",
  isVerify: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      console.log({
        ...state,
        token: action.token,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        userId: action.userId,
        imageUrl: action.imageUrl,
        tryAutoLogin: false,
        isVerify: false,
      });
      return {
        ...state,
        token: action.token,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        userId: action.userId,
        imageUrl: action.imageUrl,
        tryAutoLogin: false,
        isVerify: false,
      };
    case LOGOUT:
      return { ...initialState, tryAutoLogin: false };
    case TRY_AUTO_LOGIN_FAIL:
      return { ...state, tryAutoLogin: false };
    case UPDATE_USER_START:
      return { ...state };
    case UPDATE_USER_SUCCESS:
      return { ...state, ...action.updatedState };
    case SET_VERIFY_USER:
      return {
        ...initialState,
        email: action.email,
        isVerify: true,
        tryAutoLogin: false,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default authReducer;
