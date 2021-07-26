import axios from "axios";

export const ADD_CHAT = "ADD_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_CHAT_MESSAGES_START = "ADD_CHAT_MESSAGES_START";
export const ADD_CHAT_MESSAGES_SUCCESS = "ADD_CHAT_MESSAGES_SUCCESS";
export const ADD_CHAT_MESSAGES_FAIL = "ADD_CHAT_MESSAGES_FAIL";
export const SET_CHATS = "SET_CHATS";
export const CHATS_SET_LOADING = "CHATS_SET_LOADING";
export const CHATS_STOP_LOADING = "CHATS_STOP_LOADING";

export const fetchChats = (query = "") => {
  return (dispatch, getState) => {
    dispatch(chatsSetLoading());
    const token = getState().auth.token;
    axios
      .get("/api/chats", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        dispatch(
          setChats(
            res.data.chats.map((chat) => {
              return {
                _id: chat._id,
                userId: chat.user._id,
                username: chat.user.firstName + " " + chat.user.lastName,
                messages: chat.messages,
              };
            })
          )
        );
      })
      .catch((e) => dispatch(chatsStopLoading()));
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

export const addMessageRequest = (chatId, text, socket) => {
  return async (dispatch, getState) => {
    socket?.emit("sendMessage", { roomId: chatId, text }, (message) => {
      dispatch(addMessage(chatId, message.text, true, message._id));
    });

    return Promise.resolve();
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

export const requestAddChat = (secondUserId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    axios
      .post(
        "/api/chats",
        { secondUserId },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        console.log(res.data);
        const dbChat = res.data.chat;
        dispatch(
          addChat(
            dbChat._id,
            dbChat.user._id,
            dbChat.user.firstName + " " + dbChat.user.lastName
          )
        );
      })
      .catch((e) => console.log(e));
  };
};

export const addChat = (chatId, userId, username) => {
  return { type: ADD_CHAT, chatId, userId, username };
};

export const addMessage = (chatId, messageText, isMine, messageId) => {
  return { type: ADD_MESSAGE, chatId, messageText, isMine, messageId };
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
