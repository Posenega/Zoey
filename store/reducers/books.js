import { BOOKS } from '../../data/dummy_data';
import {
  FETCH_BOOKS_START,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  FETCH_USER_BOOKS_START,
  FETCH_USER_BOOKS_SUCCESS,
  FETCH_USER_BOOKS_FAILURE,
  FETCH_FAVORITES_BOOKS_START,
  FETCH_FAVORITES_BOOKS_SUCCESS,
  FETCH_FAVORITES_BOOKS_FAILURE,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_START,
  ADD_BOOK_FINISH,
  ADD_FAVORITE_BOOK_SUCCESS,
  REMOVE_FAVORITE_BOOK_SUCCESS,
  FILTER_BOOKS,
  DELETE_BOOK_SUCCESS,
} from '../actions/books';

const initialState = {
  books: [],
  filteredBooks: [],
  favoriteBooks: [],
  userBooks: [],
  isLoading: false,
  addBookStatus: 'PENDING',
  isFiltering: false,
  error: null,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_START:
      return { ...state, isLoading: true };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: [...action.books],
      };
    case FETCH_BOOKS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_BOOK_START:
      return { ...state, addBookStatus: 'LOADING' };
    case ADD_BOOK_SUCCESS:
      const toBeAddedBook = {
        _id: action.id,
        title: action.title,
        imageUrl: action.image,
        author: action.author,
        category: action.category,
        description: action.description,
        creator: action.creator,
      };
      console.log([toBeAddedBook, ...state.books]);
      return {
        ...state,
        books: [toBeAddedBook, ...state.books],
        userBooks: [toBeAddedBook, ...state.userBooks],
        addBookStatus: 'SUCCESS',
      };
    case ADD_BOOK_FINISH:
      return { ...state, addBookStatus: 'PENDING' };

    case ADD_FAVORITE_BOOK_SUCCESS:
      let toFavBook = state.books.find(
        (book) => book._id === action.bookId
      );
      if (!toFavBook) {
        return state;
      }
      return {
        ...state,
        favoriteBooks: [toFavBook].concat(state.favoriteBooks),
      };
    case REMOVE_FAVORITE_BOOK_SUCCESS:
      return {
        ...state,
        favoriteBooks: state.favoriteBooks.filter(
          (book) => book._id !== action.bookId
        ),
      };

    case FETCH_FAVORITES_BOOKS_START:
      return { ...state, isLoading: true };
    case FETCH_FAVORITES_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        favoriteBooks: [...action.books],
      };
    case FETCH_FAVORITES_BOOKS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case FILTER_BOOKS:
      // if (!action.searchTerm) {
      //   return { ...state, filteredBooks: state.books, isFiltering: false };
      // }
      return {
        ...state,
        filteredBooks: state.books.filter(({ title }) =>
          title
            .toLowerCase()
            .startsWith(action.searchTerm.toLowerCase())
        ),
        isFiltering: !!action.searchTerm,
      };

    case FETCH_USER_BOOKS_START:
      return { ...state, isLoading: true };
    case FETCH_USER_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userBooks: [...action.books],
      };
    case FETCH_USER_BOOKS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        books: state.books.filter(
          (book) => book._id !== action.bookId
        ),
        favoriteBooks: state.favoriteBooks.filter(
          (book) => book._id !== action.bookId
        ),
      };
    default:
      return state;
  }
};

export default booksReducer;
