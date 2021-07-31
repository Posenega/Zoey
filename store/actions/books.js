import axios from "axios";

export const FETCH_USER_BOOKS_START = "FETCH_USER_BOOKS_START";
export const FETCH_USER_BOOKS_SUCCESS = "FETCH_USER_BOOKS_SUCCESS";
export const FETCH_USER_BOOKS_FAILURE = "FETCH_USER_BOOKS_FAILURE";
export const FETCH_BOOKS_START = "FETCH_BOOKS_START";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";
export const FETCH_FAVORITES_BOOKS_START = "FETCH_FAVORITES_BOOKS_START";
export const FETCH_FAVORITES_BOOKS_SUCCESS = "FETCH_FAVORITES_BOOKS_SUCCESS";
export const FETCH_FAVORITES_BOOKS_FAILURE = "FETCH_FAVORITES_BOOKS_FAILURE";
export const FAVORITE_BOOK_START = "FAVORITE_BOOK_START";
export const ADD_FAVORITE_BOOK_SUCCESS = "ADD_FAVORITE_BOOK_SUCCESS";
export const REMOVE_FAVORITE_BOOK_SUCCESS = "REMOVE_FAVORITE_BOOK_SUCCESS";
export const FILTER_BOOKS = "FILTER_BOOKS";
export const ADD_BOOK_START = "ADD_BOOK_START";
export const ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS";
export const ADD_BOOK_FINISH = "ADD_BOOK_FINISH";
export const DELETE_BOOK_SUCCESS = "DELETE_BOOK_SUCCESS";

export const fetchBooks = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch({ type: FETCH_BOOKS_START });
    axios
      .get("/api/books/browse", {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        dispatch({
          type: FETCH_BOOKS_SUCCESS,
          books: response.data.books,
        });
      })
      .catch(function (error) {
        dispatch({ type: FETCH_BOOKS_FAILURE, payload: error });
      });
  };
};

export const fetchFavoriteBooks = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    dispatch({ type: FETCH_FAVORITES_BOOKS_START });
    axios
      .get(`/api/books/favorites/${userId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(function (response) {
        dispatch({
          type: FETCH_FAVORITES_BOOKS_SUCCESS,
          books: response.data.books,
        });
      })
      .catch(function (error) {
        dispatch({
          type: FETCH_FAVORITES_BOOKS_FAILURE,
          payload: error,
        });
      });
  };
};

export const requestAddBook = ({
  title,
  description,
  author,
  localImageUrl,
  type,
  categories,
  price,
  condition,
  isForSchool,
  grade,
  numberOfBooks,
  isPackage,
}) => {
  return async (dispatch, getState) => {
    try {
      dispatch(addBookStart());
      const token = getState().auth.token;

      let formData = new FormData();

      let filename = localImageUrl.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let fileType = match ? `image/${match[1]}` : `image`;

      formData.append("title", title);
      formData.append("description", description);

      formData.append("imageUrl", {
        uri: localImageUrl,
        name: filename,
        type: fileType,
      });
      formData.append("type", type);
      formData.append(
        "categories",
        JSON.stringify(Array.isArray(categories) ? categories : [categories])
      );

      formData.append("condition", condition);
      formData.append("isForSchool", isForSchool);
      formData.append("isPackage", isPackage);
      isPackage && formData.append("numberOfBooks", numberOfBooks);
      isForSchool && formData.append("grade", grade);
      type === "sell" && formData.append("price", price);
      !isForSchool && formData.append("author", author);

      const response = await axios({
        method: "post",
        url: "/api/books",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      const onResponse = (response) => {
        const {
          title,
          description,
          imageUrl,
          _id: id,
          type,
          categories,
          author,
          creator,
          price,
          condition,
          isForSchool,
          grade,
          isPackage,
        } = response.data.book;

        dispatch(
          addBookSuccess(
            title,
            imageUrl,
            author,
            description,
            type,
            categories,
            creator,
            price,
            id,
            condition,
            isForSchool,
            grade,
            isPackage
          )
        );
      };
      onResponse(response);
    } catch (e) {
      console.log(e);
    }
  };
};

export const addBookStart = () => {
  return { type: ADD_BOOK_START };
};

export const addBookSuccess = (
  title,
  image,
  author,
  description,
  type,
  categories,
  creator,
  price,
  id,
  condition,
  isForSchool,
  grade,
  isPackage
) => {
  return {
    type: ADD_BOOK_SUCCESS,
    title,
    image,
    author,
    description,
    bookType: type,
    categories,
    creator,
    price,
    id,
    condition,
    isForSchool,
    grade,
    isPackage,
  };
};

export const addBookFinish = () => {
  return { type: ADD_BOOK_FINISH };
};

export const requestAddFavoriteBook = (bookId) => {
  return (dispatch, getState) => {
    dispatch(addFavoriteBookSuccess(bookId));
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios({
      method: "post",
      url: `/api/books/favorites/${bookId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: { userId },
    }).catch((e) => dispatch(removeFavoriteBookSuccess(bookId)));
  };
};

export const requestRemoveFavoriteBook = (bookId) => {
  return (dispatch, getState) => {
    dispatch(removeFavoriteBookSuccess(bookId));
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios({
      method: "delete",
      url: `/api/books/favorites/${bookId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: { userId },
    }).catch((e) => dispatch(addFavoriteBookSuccess(bookId)));
  };
};

export const favoriteBookStart = () => {
  return { type: FAVORITE_BOOK_START };
};

export const addFavoriteBookSuccess = (bookId) => {
  return { type: ADD_FAVORITE_BOOK_SUCCESS, bookId };
};

export const removeFavoriteBookSuccess = (bookId) => {
  return { type: REMOVE_FAVORITE_BOOK_SUCCESS, bookId };
};

export const filterBooks = ({ searchTerm, categories, otherFilters }) => {
  return {
    type: FILTER_BOOKS,
    searchTerm,
    categories,
    otherFilters,
  };
};

export const fetchUserBooks = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_USER_BOOKS_START });
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios
      .get(`/api/books/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        dispatch({
          type: FETCH_USER_BOOKS_SUCCESS,
          books: response.data.books,
        });
      })
      .catch(function (error) {
        dispatch({ type: FETCH_USER_BOOKS_FAILURE, payload: error });
      });
  };
};

export const deleteBook = (bookId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await axios.delete(`/api/books/${bookId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch(deleteBookSuccess(bookId));
    return Promise.resolve();
  };
};

export const deleteBookSuccess = (bookId) => {
  return { type: DELETE_BOOK_SUCCESS, bookId };
};
