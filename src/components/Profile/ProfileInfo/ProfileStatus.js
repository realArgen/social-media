import React, { useState } from 'react'


const ProfileStatus = ({ status }) => {

    const [editMode, setEditMode] = useState(false);

    return (

        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={() => { setEditMode(true) }}>{status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input value={status} onBlur={() => setEditMode(false)} />
                </div>
            }
        </div>
    )
}





export default ProfileStatus;