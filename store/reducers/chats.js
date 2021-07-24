import {
  ADD_CHAT,
  ADD_CHAT_MESSAGES_START,
  ADD_CHAT_MESSAGES_SUCCESS,
  ADD_MESSAGE,
  SET_CHATS,
  SET_LOADING,
  STOP_LOADING,
} from "../actions/chats";

const initialState = {
  myChats: [],
  isLoading: false,
};

export default chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case ADD_CHAT:
      if (
        state.myChats.findIndex((chat) => chat.userId === action.userId) >= 0
      ) {
        return state;
      }
      return {
        ...state,
        myChats: [
          {
            _id: action.chatId,
            userId: action.userId,
            username: action.username,
            messages: [],
            isLoading: false,
          },
          ...state.myChats,
        ],
      };
    case ADD_CHAT_MESSAGES_START:
      const chatIndex = state.myChats.findIndex(
        (chat) => chat._id === action.chatId
      );
      if (chatIndex <= -1) {
        return state;
      }
      const fetchedChat = {
        ...state.myChats[chatIndex],
        isLoading: true,
      };
      state.myChats.splice(chatIndex, 1);
      return { ...state, myChats: [fetchedChat, ...state.myChats] };

    case ADD_CHAT_MESSAGES_SUCCESS:
      const cIndex = state.myChats.findIndex(
        (chat) => chat._id === action.chatId
      );
      if (cIndex <= -1) {
        return state;
      }
      const fChat = {
        ...state.myChats[cIndex],
        isLoading: false,
        messages: action.messages,
      };
      state.myChats.splice(cIndex, 1);
      return { ...state, myChats: [fChat, ...state.myChats] };
    case ADD_MESSAGE:
      const targetedChatIndex = state.myChats.findIndex(
        (chat) => chat._id === action.chatId
      );
      if (targetedChatIndex < 0) {
        return state;
      }

      const message = {
        text: action.messageText,
        isMine: action.isMine,
        _id: action.messageId,
      };
      const targetedChat = {
        ...state.myChats[targetedChatIndex],
        messages: [...state.myChats[targetedChatIndex].messages, message],
      };
      const updatedChats = state.myChats
        .filter((chat) => chat._id !== targetedChat._id)
        .concat(targetedChat);
      return { ...state, myChats: updatedChats };
    case SET_CHATS:
      return { ...state, myChats: action.chats, isLoading: false };
    default:
      return state;
  }
};
