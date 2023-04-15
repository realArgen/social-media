const ADD__MESSAGE = "ADD__MESSAGE";
const UPDATE__NEW__MESSAGE = "UPDATE__NEW__MESSAGE";

let dialogsPage = {
    messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Valar Morgulis" },
        { id: 3, message: "Duh" }
    ],
    dialogs: [
        { id: 1, name: "Yen" },
        { id: 2, name: "Tris" },
        { id: 3, name: "Gerald" },
        { id: 4, name: "Deayne" },
    ],
    newMessageText: "hello"
}

const dialogsReducer = (state = dialogsPage, action) => {
    switch (action.type) {
        case ADD__MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 13, message: state.newMessageText }],
                newMessageText: ""
            }

        case UPDATE__NEW__MESSAGE:
            return {
                ...state,
                newMessageText: action.newMessageText
            }

        default:
            return state;
    }
    return state;

}

export const addMessageActionCreator = () => ({ type: ADD__MESSAGE })
export const updateNewMessageActionCreator = (message) => ({ type: UPDATE__NEW__MESSAGE, newMessageText: message })

export default dialogsReducer;