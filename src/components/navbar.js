import React from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar_Func(props) {
    const logState = useSelector((state) => state.isLogged);
    const username = useSelector((state) => state.username);
    const email = useSelector((state) => state.email);
    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="pict.edu">PICT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav>
                    <Nav.Link href="/read">Read Experience</Nav.Link>
                    <Nav.Link href="/add">Add Experience</Nav.Link>
                    <Nav.Link href="/tips">See Tips</Nav.Link>
                    {!logState ? <div><Button><Nav.Link href="/login">Login</Nav.Link></Button>
                        <Button><Nav.Link href="/signup">Sign Up</Nav.Link></Button></div> : <div><Navbar.Text>
                            {username}</Navbar.Text><Navbar.Text>{email}</Navbar.Text></div>}
                </Nav>
            </Navbar>
        </Container>
    )
}