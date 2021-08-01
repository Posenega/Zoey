import axios from "axios";

export const FETCH_PACKAGES_START = "FETCH_PACKAGES_START";
export const FETCH_PACKAGES_SUCCESS = "FETCH_PACKAGES_SUCCESS";
export const FETCH_PACKAGES_FAILURE = "FETCH_PACKAGES_FAILURE";

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

export const fetchPackages = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch({ type: FETCH_PACKAGES_START });
    axios
      .get("/api/packages", {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        dispatch({
          type: FETCH_PACKAGES_SUCCESS,
          packages: response.data.packages,
        });
      })
      .catch(function (error) {
        dispatch({ type: FETCH_PACKAGES_FAILURE, payload: error });
      });
  };
};
