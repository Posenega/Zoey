import { ADD_CHAT, ADD_MESSAGE, SET_CHATS } from "../actions/chats";

const initialState = {
  myChats: [],
};

export default chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT:
      if (
        state.myChats.findIndex((chat) => chat.userId === action.userId) >= 0
      ) {
        return;
      }
      return {
        ...state,
        myChats: [
          {
            _id: action.chatId,
            userId: action.userId,
            username: action.username,
            messages: [],
          },
          ...state.myChats,
        ],
      };
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
      return { ...state, myChats: action.chats };
    default:
      return state;
  }
};
