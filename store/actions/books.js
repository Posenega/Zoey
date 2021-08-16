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

export const fetchBooks = (refresh = false) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      dispatch({ type: FETCH_BOOKS_START, refresh });
      const response = await axios.get("/api/books/browse", {
        headers: { Authorization: "Bearer " + token },
      });

      dispatch({
        type: FETCH_BOOKS_SUCCESS,
        books: response.data.books,
      });
      return Promise.resolve();
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: error });
    }
  };
};

export const fetchFavoriteBooks = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch({ type: FETCH_FAVORITES_BOOKS_START });
    axios({
      method: "post",
      url: "/api/books/favorites",
      headers: {
        Authorization: "Bearer " + token,
      },
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
  return async (dispatch, getState) => {
    try {
      dispatch(addBookStart());
      const token = getState().auth.token;

      const response = await axios({
        method: "post",
        url: "/api/books",
        data,
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
    axios({
      method: "post",
      url: `/api/books/favorites/${bookId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).catch((e) => {
      console.log(e);
      dispatch(removeFavoriteBookSuccess(bookId));
    });
  };
};

export const requestRemoveFavoriteBook = (bookId) => {
  return (dispatch, getState) => {
    dispatch(removeFavoriteBookSuccess(bookId));
    const token = getState().auth.token;
    axios({
      method: "delete",
      url: "/api/books/favorites",
      headers: {
        Authorization: "Bearer " + token,
      },
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
    axios({
      method: "POST",
      url: "/api/books/user",
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
