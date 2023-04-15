// import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer';
// import { connect } from "react-redux";
// import MyPosts from './MyPosts';


// const MyPostsContainer = ({ }) => {

//     return (
//         <Provider.Consumer>
//             {(store) => {
//                 const addPost = () => {
//                     store.dispatch(addPostActionCreator())
//                 }

//                 const updateNewPostText = (text) => {
//                     store.dispatch(updateNewPostTextActionCreator(text))
//                 }
//                 return (
//                     < MyPosts newPostText={store.getState().profilePage.newPostText} posts={store.getState().profilePage.posts} addPost={addPost} updateNewPostText={updateNewPostText} />
//                 )
//             }}
//         </Provider.Consumer>
//     )
// }

// import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer';
// import { connect } from "react-redux";
// import MyPosts from './MyPosts';

// let mapStateToProps = (state) => {
//     return {
//         profilePage: state.profilePage,
//         posts: state.profilePage.posts,
//         newPostText: state.profilePage.newPostText,
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addPost() { dispatch(addPostActionCreator()) },
//         updateNewPostText(body) { dispatch(updateNewPostTextActionCreator(body)) },
//     }
// }

// const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

// export default MyPostsContainer;