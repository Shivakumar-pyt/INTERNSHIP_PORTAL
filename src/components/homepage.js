import React from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar_Func from "./navbar";

export default function HomePage(props) {
    return (
        <Container>
            <Navbar_Func/>
        </Container>
    )
}