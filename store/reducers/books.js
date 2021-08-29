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
  UPDATE_BOOK,
  updateBook,
} from "../actions/books";

const initialState = {
  books: [],
  filteredBooks: [],
  favoriteBooks: [],
  userBooks: [],
  isLoading: false,
  addBookStatus: "PENDING",
  isFiltering: false,
  error: null,
  soldBooks: [],
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_START:
      return { ...state, isLoading: !action.refresh };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        books: [...action.books],
        filteredBooks: [...action.books],
      };
    case FETCH_BOOKS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_BOOK_START:
      return { ...state, addBookStatus: "LOADING" };
    case ADD_BOOK_SUCCESS:
      const toBeAddedBook = {
        _id: action.id,
        title: action.title,
        imageUrl: action.image,
        author: action.author,
        categories: action.categories,
        description: action.description,
        creator: action.creator,
        type: action.bookType,
        price: action.price,
        condition: action.condition,
        isForSchool: action.isForSchool,
        grade: action.grade,
        isPackage: action.isPackage,
        isSold: false,
      };

      return {
        ...state,
        // books: [toBeAddedBook, ...state.books],
        userBooks: [toBeAddedBook, ...state.userBooks],

        addBookStatus: "SUCCESS",
      };
    case ADD_BOOK_FINISH:
      return { ...state, addBookStatus: "PENDING" };

    case ADD_FAVORITE_BOOK_SUCCESS:
      let toFavBook = state.books.find((book) => book._id === action.bookId);
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
      return {
        ...state,
        filteredBooks: state.books.filter((book) => {
          if (
            action.searchTerm &&
            !book.title
              .toLowerCase()
              .startsWith(action.searchTerm.toLowerCase())
          ) {
            return false;
          }

          if (
            action.categories &&
            action.categories.length > 0 &&
            !action.categories.includes(book.categories[0])
          ) {
            return false;
          }
          if (action.otherFilters) {
            if (
              action.otherFilters.includes("For School") &&
              !book.isForSchool
            ) {
              return false;
            }
            if (
              action.otherFilters.includes("New") &&
              book.condition !== "New"
            ) {
              return false;
            }
            if (
              action.otherFilters.includes("Used") &&
              book.condition !== "Used"
            ) {
              return false;
            }
          }

          return true;
        }),
        isSearching: !!action.searchTerm,
      };

    case FETCH_USER_BOOKS_START:
      return { ...state, isLoading: true };
    case FETCH_USER_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userBooks: action.soldBooks ? state.userBooks : [...action.books],
        soldBooks: action.soldBooks ? [...action.books] : state.soldBooks,
      };
    case FETCH_USER_BOOKS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case DELETE_BOOK_SUCCESS:
      const removeByActionBookId = (books) =>
        books.filter((book) => book._id !== action.bookId);

      return {
        ...state,
        books: removeByActionBookId(state.books),
        favoriteBooks: removeByActionBookId(state.favoriteBooks),
        filteredBooks: removeByActionBookId(state.filteredBooks),
        soldBooks: filterPackages(state.soldPackages),
        userBooks: removeByActionBookId(state.userBooks),
      };
    case UPDATE_BOOK:
      const bookIndex = state.userBooks.findIndex(
        (book) => book._id === action.bookId
      );
      if (bookIndex < 0) {
        return state;
      }

      if (action.isSold) {
        state.userBooks.splice(bookIndex, 1);
        return {
          ...state,
          userBooks: [...state.userBooks],
          soldBooks: [action.updatedBook, ...state.soldBooks],
        };
      }

      state.userBooks.splice(bookIndex, 1, action.updatedBook);

      return {
        ...state,
        userBooks: [...state.userBooks],
      };
    default:
      return state;
  }
};

export default booksReducer;
