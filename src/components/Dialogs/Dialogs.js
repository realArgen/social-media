import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialogsReducer'
import DialogItem from './DialogItem/DialogItem'
import c from './Dialogs.module.css'
import Message from './Message/Message'

const Dialogs = () => {

    const dialogs = useSelector((state) => state.dialogsPage.dialogs);
    const messages = useSelector((state) => state.dialogsPage.messages);
    const newMessageText = useSelector((state) => state.dialogsPage.newMessageText);

    const dispatch = useDispatch();

    const addMessage = () => {
        dispatch(addMessageActionCreator());
    }

    const onMessageChange = (e) => {
        dispatch(updateNewMessageActionCreator(e.target.value));
    };

    return (
        <div className={c.dialogs}>
            <div className={c["dialogs-items"]}>
                {dialogs.map(d => {
                    return <DialogItem name={d.name} id={d.id} />
                })}
            </div>
            <div className={c.messages}>
                {messages.map(d => {
                    return <Message message={d.message} />
                })}
                <textarea
                    value={newMessageText}
                    onChange={onMessageChange}
                />
                <div><button onClick={addMessage}>Click</button></div>
            </div>
        </div>
    )
}

export default Dialogs;


// import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialogsReducer';
// import Dialogs from './Dialogs';
// import { connect } from "react-redux";

// let mapStateToProps = (state) => {
//     return {
//         dialogs: state.dialogsPage.dialogs,
//         messages: state.dialogsPage.messages,
//         newMessageText: state.dialogsPage.newMessageText
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         handleAddMessage() { dispatch(addMessageActionCreator()) },
//         handleOnMessageChange(text) { dispatch(updateNewMessageActionCreator(text)) }
//     }
// }

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

// export default DialogsContainer
