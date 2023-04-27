import React, { useRef } from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import signup_image from "../assets/signup_background.png";
import "../styles/signup_styles.css";

export default function SignUp(props) {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const cpassword = useRef();
    const college = useRef();
    const usernameError = useRef();
    const emailError = useRef();
    const passwordError = useRef();
    const cpasswordError = useRef();
    const [error, setError] = useState(true);

    const backend_url = ""

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username.current.value, password.current.value, email.current.value, cpassword.current.value, college.current.value);
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        var errorCount = 0;
        if (username.current.value === undefined || username.current.value === "") {
            errorCount += 1;
            usernameError.current.innerHTML = "Username is a mandatory field...";
        }
        else {
            usernameError.current.innerHTML = "";
        }
        if (email.current.value === "") {
            errorCount += 1;
            emailError.current.innerHTML = "Email is a mandatory field...";
        }
        else {
            if (!regex.test(email.current.value)) {
                errorCount += 1;
                emailError.current.innerHTML = "Email address is invalid...";
            }
            else {
                emailError.current.innerHTML = "";
            }
        }
        if (password.current.value === undefined || password.current.value === "") {
            errorCount += 1;
            passwordError.current.innerHTML = "Password is a mandatory field...";
        }
        else {
            passwordError.current.innerHTML = "";
        }

        if (cpassword.current.value === undefined || cpassword.current.value === "") {
            cpasswordError.current.innerHTML = "Password is a mandatory field...";
        }
        else if (password.current.value !== undefined && cpassword.current.value != undefined && password.current.value !== cpassword.current.value) {
            errorCount += 1;
            cpasswordError.current.innerHTML = "Password do not match. Try Again...";
        }
        else {
            cpasswordError.current.innerHTML = "";
        }

        if (errorCount === 0) {
            setError(false);
        }
    }

    useEffect(() => {
        if (!error) {
            console.log("no errors");
        }
    }, [error])

    return (
        <div className="signupform">
            <Image className="signupform-image" src={signup_image} />
            <Form className="signupform-container">
                <Form.Text style={{ fontWeight: 'bold', fontSize: '24px' }}>Sign Up</Form.Text>
                <Form.Group>
                    <Form.Label className="signupform-label">Username</Form.Label>
                    <Form.Control ref={username} />
                    <Form.Text ref={usernameError}></Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label className="signupform-label">Email</Form.Label>
                    <Form.Control ref={email} />
                    <Form.Text ref={emailError}></Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label className="signupform-label">Password</Form.Label>
                    <Form.Control ref={password} type="password" />
                    <Form.Text ref={passwordError}></Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label className="signupform-label">Confirm Password</Form.Label>
                    <Form.Control ref={cpassword} />
                    <Form.Text ref={cpasswordError} type="password"></Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label className="signupform-label">College</Form.Label>
                    <Form.Control ref={college} />
                    <Form.Text></Form.Text>
                </Form.Group>
                <Button className="signupform-button" onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    )
}