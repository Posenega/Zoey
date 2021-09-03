import { Platform } from "react-native";
import {
  ADD_CHAT,
  ADD_CHAT_MESSAGES_START,
  ADD_CHAT_MESSAGES_SUCCESS,
  ADD_MESSAGE,
  SET_CHATS,
  CHATS_SET_LOADING,
  CHATS_STOP_LOADING,
} from "../actions/chats";

const initialState = {
  myChats: [],
  isLoading: false,
  hasInit: false,
};

export default chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_SET_LOADING:
      return { ...state, isLoading: true };
    case CHATS_STOP_LOADING:
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
            userImage: action.userImage,
            messages: action.messages,
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

      const chat = state.myChats[chatIndex];
      const fetchedChat = {
        ...chat,
        isLoading: true,
      };
      state.myChats.splice(chatIndex, 1, fetchedChat);
      return { ...state, myChats: [...state.myChats] };

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

      state.myChats.splice(cIndex, 1, fChat);

      return { ...state, myChats: [...state.myChats] };
    case ADD_MESSAGE:
      const targetedChatIndex = state.myChats.findIndex(
        (chat) => chat._id === action.chatId
      );
      if (targetedChatIndex < 0) {
        return state;
      }

      const message = {
        _id: action.messageId,
        text: action.messageText,
        isMine: action.isMine,

        createdAt: action.createdAt,
      };
      const targetedChat = {
        ...state.myChats[targetedChatIndex],
        messages: [message, ...state.myChats[targetedChatIndex].messages],
      };

      const updatedChatIndex = state.myChats.findIndex(
        (chat) => chat._id === targetedChat._id
      );
      state.myChats.splice(updatedChatIndex, 1, targetedChat);
      return { ...state, myChats: [...state.myChats] };
    case SET_CHATS:
      return {
        ...state,
        myChats: action.chats,
        isLoading: false,
        hasInit: true,
      };
    default:
      return state;
  }
};
