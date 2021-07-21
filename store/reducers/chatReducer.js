import { ADD_CHAT, ADD_MESSAGE } from "../actions/chats"

const initialState = {
    myChats = [] 
}

const chatReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_CHAT:
            return {...state, _id: action.chatId, userId: action.userId, username: action.username};
        case ADD_MESSAGE:
            const targetedChatIndex = state.myChats.findIndex(chat => chat._id === action.chatId);
            if(targetedChatIndex < 0){
                return state;
            }
           
            const message = {text: action.messageText, isMine: action.isMine}
            const targetedChat = {...action.myChats[targetedChatIndex], messages : [message, ...targetedChat.messages]}
            const updatedChats = action.myChats.filter(chat => chat._id !== targetedChat._id).concat(targetedChat)
            return {...state, updatedChats};
        default: 
            return state
        
    }
}