import axios from "axios";

export const ADD_CHAT = "ADD_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_CHAT_MESSAGES_START = "ADD_CHAT_MESSAGES_START";
export const ADD_CHAT_MESSAGES_SUCCESS = "ADD_CHAT_MESSAGES_SUCCESS";
export const ADD_CHAT_MESSAGES_FAIL = "ADD_CHAT_MESSAGES_FAIL";
export const SET_CHATS = "SET_CHATS";
export const CHATS_SET_LOADING = "CHATS_SET_LOADING";
export const CHATS_STOP_LOADING = "CHATS_STOP_LOADING";

export const fetchChats = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(chatsSetLoading());
      const token = getState().auth.token;
      const res = await axios.get("/api/chats", {
        headers: { Authorization: "Bearer " + token },
      });
      dispatch(
        setChats(
          res.data.chats.map((chat) => {
            return {
              _id: chat._id,
              userId: chat.user._id,
              username: chat.user.firstName + " " + chat.user.lastName,
              userImage: chat.user.image,
              messages: chat.messages,
            };
          })
        )
      );

      return Promise.resolve();
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchChatMessages = (chatId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    dispatch(addChatMessagesStart(chatId));

    try {
      const res = await axios.get(`/api/chats?_id=${chatId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const messages = res.data.chat.messages;

      dispatch(addChatMessagesSuccess(chatId, messages));

      return Promise.resolve();
    } catch (e) {
      return console.log(e);
    }
  };
};

export const addMessageRequest = (chatId, text) => {
  return async (dispatch, getState) => {
    try {
      const socket = getState().auth.socket;
      const token = getState().auth.token;
      const sendMessagePromise = new Promise((resolve, reject) => {
        socket?.emit(
          "sendMessage",
          { roomId: chatId, text, token },
          ({ message, error }) => {
            dispatch(
              addMessage(
                chatId,
                message.text,
                true,
                message.createdAt,
                message._id
              )
            );
            resolve();

            if (error) {
              reject();
            }
          }
        );
      });
      await sendMessagePromise;
      return Promise.resolve();
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const addChatMessagesSuccess = (chatId, messages) => {
  return { type: ADD_CHAT_MESSAGES_SUCCESS, chatId, messages };
};

export const addChatMessagesStart = (chatId) => {
  return { type: ADD_CHAT_MESSAGES_START, chatId };
};

export const addChatMessagesFail = (chatId) => {
  return { type: ADD_CHAT_MESSAGES_FAIL, chatId };
};

export const requestAddChat = (secondUserId, firstMessage) => {
  return async (dispatch, getState) => {
    const socket = getState().auth.socket;
    const token = getState().auth.token;
    const addChatPromise = new Promise((resolve, reject) => {
      socket?.emit(
        "addRoom",
        { secondUserId, firstMessage, token },
        ({ chat, error }) => {
          if (error) reject(error);
          dispatch(
            addChat(
              chat._id,
              chat.user._id,
              chat.user.firstName + " " + chat.user.lastName,
              chat.user.image,
              chat.messages
            )
          );

          resolve();
        }
      );
    });
    await addChatPromise;
    return Promise.resolve();
  };
};

export const addChat = (chatId, userId, username, userImage, messages = []) => {
  return { type: ADD_CHAT, chatId, userId, username, userImage, messages };
};

export const addMessage = (
  chatId,
  messageText,
  isMine,
  createdAt,
  messageId
) => {
  return {
    type: ADD_MESSAGE,
    chatId,
    messageText,
    isMine,
    createdAt,
    messageId,
  };
};

export const setChats = (chats) => {
  return { type: SET_CHATS, chats };
};

export const chatsSetLoading = () => {
  return { type: CHATS_SET_LOADING };
};

export const chatsStopLoading = () => {
  return { type: CHATS_STOP_LOADING };
};
