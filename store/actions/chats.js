import axios from "axios";

export const ADD_CHAT = "ADD_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_CHATS = "SET_CHATS";

export const fetchChats = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    axios
      .get("/api/chats", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const secondUser =
          typeof chat.user1 === "string" ? chat.user2 : chat.user1;
        dispatch(
          setChats(
            res.data.chats.map((chat) => {
              return {
                _id: chat._id,
                userId: secondUser._id,
                username: secondUser.firstName + " " + secondUser.lastName,
                messages: chat.messages,
              };
            })
          )
        );
      });
  };
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
        const dbChat = res.data.chat;
        dispatch(
          addChat({
            _id: dbChat._id,
            userId: dbChat.user2._id,
            username: dbChat.user2.firstName + " " + dbChat.user2.lastName,
            messages: dbChat.messages,
          })
        );
      });
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
