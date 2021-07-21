export const ADD_CHAT = 'ADD_CHAT';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addChat = (chatId, userId, username) => {
  return { type: ADD_CHAT, chatId, userId, username };
};

export const addMessage = (chatId, messageText, isMine) => {
  return { type: ADD_MESSAGE, chatId, messageText, isMine };
};
