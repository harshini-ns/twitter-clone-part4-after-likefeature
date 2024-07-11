import { Button, Col, Image, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react"
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { likePost, removeLikeFromPost, deletePost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";
import UpdatePostModal from "./UpdatePostModal";


export default function ProfilePostCard({ post }) {
    const { content, id: postId, imageUrl } = post;
    const [likes, setLikes] = useState(post.likes || []);
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    // user has liked the post if their id is in the likes array
    const isLiked = likes.includes(userId);


    // //
    // const [likes, setLikes] = useState([]);

    // //decodinhg
    // const token = localStorage.getItem("authToken");
    // const decode = jwtDecode(token);
    // const userId = decode.id;
    // //

    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
    // const BASE_URL = "https://ee54e5e2-9c1c-49ed-9d71-1270f518f1fa-00-tbxout3b9f77.riker.replit.dev"
    // //
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);





    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

    // add userID to likes array
    const addToLikes = () => {
        setLikes([...likes, userId]);
        dispatch(likePost({ userId, postId }));
    };

    // remove userID from likes array and update the backend
    const removeFromLikes = () => {
        setLikes(likes.filter((id) => id !== userId));
        dispatch(removeLikeFromPost({ userId, postId }));
    };

    //delete post 
    const handleDelete = () => {
        dispatch(deletePost({ userId, postId }));
        alert("post is deleted");
    }


    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3"
            }}
        >
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Haris</strong>
                <span> @haris.samingan · Apr 16</span>
                <p>{content} </p>

                <Image src={imageUrl} style={{ width: 150 }} />

                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>

                    <Button variant="light" onClick={handleLike}>
                        {isLiked ? (
                            <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                        {likes.length}
                    </Button>

                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>

                    <Button variant="light">
                        <i
                            className="bi bi-pencil-square"
                            onClick={handleShowUpdateModal}
                        ></i>
                    </Button>
                    <Button variant="light" >
                        <i className="bi bi-trash" onClick={handleDelete}></i>
                    </Button>
                    <UpdatePostModal
                        show={showUpdateModal}
                        handleClose={handleCloseUpdateModal}
                        postId={postId}
                        originalPostContent={content}
                    />

                </div>
            </Col>
        </Row >
    )
}

