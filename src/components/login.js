import React from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import '../styles/loginStyles.css';
import login_pic from '../assets/login_pic.jpg';
import { loggedIn } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [response,setResponse] = useState("");
    const backend_url = 'http://localhost:5000/user/login';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { username, password };
        fetch(backend_url,{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setResponse(data.message);
            if(data.message === "User logged in successfully...") {
                setIsAuthenticated(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(loggedIn({username: username, password: password}));
            setTimeout(() => {
                navigate("/");
            },500)
        }
    },[isAuthenticated])

    return (
        <div className="loginform">
            <div className="loginform-display">
                <Image className="loginform-image" src={login_pic} />
                <Form className="loginform-container">
                    <Form.Text style={{ marginTop: '1%', fontWeight: 'bold', fontSize: '24px' }}>Login</Form.Text>
                    <Form.Group>
                        <Form.Label className="loginform-label">Username</Form.Label>
                        <Form.Control value={username} placeholder="Enter Username" onChange={(e) => { setUsername(e.target.value) }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="loginform-label">Password</Form.Label>
                        <Form.Control value={password} placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Group>
                    <Button className="loginform-button" onClick={handleSubmit}>Submit</Button>
                    <Form.Text>{response}</Form.Text>
                </Form>
            </div>
        </div>
    )
}