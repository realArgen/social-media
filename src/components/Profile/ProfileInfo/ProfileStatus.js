import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStatusThunkCreator } from '../../../redux/profileReducer'

const ProfileStatus = () => {

    const status = useSelector((state) => state.profilePage.status)

    const dispatch = useDispatch();




    const [editMode, setEditMode] = useState(false);
    const [inputText, setinputText] = useState("dfdf");

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatusThunkCreator(inputText))
    }

    return (

        <div>
            {!editMode &&
                <div>
                    <span value={status || "no status currently"} onDoubleClick={() => { setEditMode(true) }}>{status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input value={inputText} onChange={(e) => setinputText(e.target.value)} onBlur={() => deactivateEditMode(false)} />
                </div>
            }
        </div>
    )
}





export default ProfileStatus;