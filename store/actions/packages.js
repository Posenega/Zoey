import axios from "axios";

export const requestAddPackage = (data) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    axios({
      method: "post",
      url: "/api/packages",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }).catch((e) => console.log(e));
  };
};
