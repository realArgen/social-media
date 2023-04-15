import React from 'react'
import c from './MyPosts.module.css'
import Post from './Post/Post'
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer';
import { useDispatch, useSelector } from 'react-redux';

const MyPosts = () => {

    const posts = useSelector((state) => state.profilePage.posts);
    const newPostText = useSelector((state) => state.profilePage.newPostText);

    const dispatch = useDispatch();

    const onAddPost = () => {
        dispatch(addPostActionCreator())
    }

    const onPostChange = (e) => {
        dispatch(updateNewPostTextActionCreator(e.target.value));
    }


    return (
        <div className={c.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div> <textarea
                    value={newPostText}
                    onChange={onPostChange}
                    cols="30" rows="5"
                />
                </div>
                <div><button onClick={onAddPost}>Add Post</button></div>
            </div>
            <div className={c.posts}>
                {posts.map(d => <Post key={d.id} message={d.message} likes={d.likes} />)}
            </div>
        </div>
    )
}

export default MyPosts


