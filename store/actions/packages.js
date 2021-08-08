import axios from "axios";

export const FETCH_PACKAGES_START = "FETCH_PACKAGES_START";
export const FETCH_PACKAGES_SUCCESS = "FETCH_PACKAGES_SUCCESS";
export const FETCH_PACKAGES_FAILURE = "FETCH_PACKAGES_FAILURE";
export const ADD_PACKAGE = "ADD_PACKAGE";
export const ADD_PACKAGE_START = "ADD_PACKAGE_START";
export const ADD_PACKAGE_FAILURE = "ADD_PACKAGE_FAILURE";

export const requestAddPackage = ({
  title,
  localUrl,
  description,
  type,
  categories,
  grade,
  price,
  condition,
  forSchool,
  numberOfBooks,
}) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addPackageStart());
      const token = getState().auth.token;

      let formData = new FormData();

      let filename = localUrl.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let fileType = match ? `image/${match[1]}` : `image`;

      formData.append("title", title);
      formData.append("description", description);
      formData.append("imageUrl", {
        uri: localUrl,
        name: filename,
        type: fileType,
      });
      formData.append("type", type);
      formData.append("categories", JSON.stringify(categories));
      forSchool && formData.append("grade", grade);
      type === "sell" && formData.append("price", price);
      formData.append("condition", condition);
      formData.append("isForSchool", forSchool);

      formData.append("numberOfBooks", numberOfBooks);

      console.log(formData);

      const response = await axios({
        method: "post",
        url: "/api/packages",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      dispatch(addPackage(response.data.package));
      return Promise.resolve();
    } catch (e) {
      dispatch(addPackageFailure());
      throw e;
    }
  };
};

export const fetchPackages = (refresh = false) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      dispatch({ type: FETCH_PACKAGES_START, refresh });
      const response = await axios.get("/api/packages", {
        headers: { Authorization: "Bearer " + token },
      });

      dispatch({
        type: FETCH_PACKAGES_SUCCESS,
        packages: response.data.packages,
      });
      return Promise.resolve();
    } catch (error) {
      dispatch({ type: FETCH_PACKAGES_FAILURE, payload: error });
    }
  };
};

export const addPackage = (toAddPackage) => {
  return { type: ADD_PACKAGE, package: toAddPackage };
};

export const addPackageStart = () => {
  return { type: ADD_PACKAGE_START };
};

export const addPackageFailure = () => {
  return { type: ADD_PACKAGE_FAILURE };
};
