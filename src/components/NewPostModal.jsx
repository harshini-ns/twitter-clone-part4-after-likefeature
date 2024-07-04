import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { savePost } from "../features/posts/postsSlice";
import { useDispatch } from "react-redux"





export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("");
    const dispatch = useDispatch(); //disptach is added 



    const handleSave = () => {
        dispatch(savePost(postContent));
        handleClose();
        setPostContent("");
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control placeholder="what is happening" as="textarea" rows={3} onChange={(e) => setPostContent(e.target.value)} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pill" onClick={handleSave}> Tweet ! </Button>
                </Modal.Footer>
            </Modal>
        </>
    )


}




