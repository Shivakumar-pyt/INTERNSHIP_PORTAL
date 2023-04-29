import React from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar_Func(props) {
    const logState = useSelector((state) => state.isLogged);
    const username = useSelector((state) => state.username);
    const email = useSelector((state) => state.email);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(loggedOut())
    }

    const buttonClick = (path) => {
        if(!logState) {
            alert('Login is required...')
            navigate("/login");
        }
        else{
            if(path === "/add") {
                path += "/" + username;
            }

            navigate(path);
        }   
    }

    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="pict.edu">PICT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav>
                    <Nav.Link onClick={() => buttonClick("/read")}>Read Experience</Nav.Link>
                    <Nav.Link onClick={() => buttonClick("/add")}>Add Experience</Nav.Link>
                    <Nav.Link onClick={() => buttonClick("/tips")}>See Tips</Nav.Link>
                    {!logState ? <div><Button><Nav.Link href="/login">Login</Nav.Link></Button>
                        <Button><Nav.Link href="/signup">Sign Up</Nav.Link></Button></div> : <div><Navbar.Text>
                            {username}</Navbar.Text><Navbar.Text>{email}</Navbar.Text>
                        <Button onClick={handleLogout}>Logout</Button></div>}
                </Nav>
            </Navbar>
        </Container>
    )
}