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

export const requestAddBook = (data) => {
  return (dispatch, getState) => {
    dispatch(addBookStart());
    const token = getState().auth.token;

    axios({
      method: "post",
      url: "/api/books",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
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
            grade
          )
        );
      })
      .catch((e) => console.log(e));
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
  grade
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

export const filterBooks = ({ searchTerm, filters }) => {
  return {
    type: FILTER_BOOKS,
    searchTerm,
    filters,
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

export const deleteBook = (bookId, goBack) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    axios
      .delete(`/api/books/${bookId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        goBack();
        setTimeout(() => dispatch(deleteBookSuccess(bookId)), 1000);
      });
  };
};

export const deleteBookSuccess = (bookId) => {
  return { type: DELETE_BOOK_SUCCESS, bookId };
};
