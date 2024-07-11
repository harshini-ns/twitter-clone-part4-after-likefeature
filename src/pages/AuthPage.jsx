import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, sendPasswordResetEmail } from "firebase/auth";


import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../components/AuthProvider";

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1";
    // const url =
    //     "https://58313eb4-d1a4-4353-8169-7e35efc691e5-00-14mnp0a3bw1g1.riker.replit.dev";


    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    //username and password useaState
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); //error message is declared
    //token
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();

    const auth = getAuth(); //from firebase 
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        if (currentUser) {
            navigate("/profile");
        }
    }, [currentUser, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, username, password);
            console.log(res.user);
            alert("sucessfully created an account")
        } catch (error) {
            console.error(error);
            setErrorMessage("user name already exits")
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
            alert("successfull login")
        }
        catch (error) {
            console.error(error);
            setErrorMessage(" pshhh , wrong username or password")
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }


    //fb login function using firebase 
    const facebookProvider = new FacebookAuthProvider();
    const handleFacebookLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, facebookProvider);
        } catch (error) {
            console.log(error);
        }

    }
    ///password reset email and added the button 
    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, username);
            alert("Password reset email has been sent. Check your inbox.");
        } catch (error) {
            console.error(error);

        }
    };



    //

    const handleClose = () => {
        setModalShow(null);
        setErrorMessage("");
    }

    ////

    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className="p-4">
                <i
                    className="bi bi-twitter"
                    style={{ fontSize: 50, color: "dodgerblue" }}
                ></i>

                <p className="mt-5" style={{ fontSize: 64 }}>
                    Happening Now
                </p>
                <h2 className="my-5" style={{ fontSize: 31 }}>
                    Join Twitter today.
                </h2>
                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleFacebookLogin}>
                        <i className="bi bi-facebook"></i> Sign up with Facebook
                    </Button>

                    <Button className="rounded-pill" variant="outline-dark" >
                        <i className="bi bi-github"></i> Sign up with github
                    </Button>


                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{ fontSize: "12px" }}>
                        By signing up, you agree to the Terms of Service and Privacy Policy,
                        including Cookie Use.
                    </p>

                    <p className="mt-5" style={{ fontWeight: "bold" }}>
                        Already have an account?
                    </p>
                    <Button
                        className="rounded-pill"
                        variant="outline-primary"
                        onClick={handleShowLogin}
                    >
                        Sign in
                    </Button>
                </Col>
                <Modal
                    show={modalShow !== null}
                    onHide={handleClose}
                    animation={false}
                    centered
                >
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "SignUp"
                                ? "Create your account"
                                : "Log in to your account"}
                        </h2>
                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email"
                                    placeholder="Enter username"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>


                            {errorMessage && (
                                <div className="error-message" style={{ color: "red" }}>
                                    {errorMessage}
                                </div>
                            )}


                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy
                                Policy, including Cookie Use. SigmaTweets may use your contact
                                information, including your email address and phone number for
                                purposes outlined in our Privacy Policy, like keeping your
                                account secure and personalising our services, including ads.
                                Learn more. Others will be able to find you by email or phone
                                number, when provided, unless you choose otherwise here.
                            </p>

                            <Button className="rounded-pill" type="submit">
                                {modalShow === "SignUp" ? "Sign up" : "Log in"}
                            </Button>

                            <Button className="rounded-pill" onClick={handlePasswordReset}>
                                Forgot password? Reset it here
                            </Button>

                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
}
