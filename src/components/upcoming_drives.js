import React, { useRef } from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UpcomingDrives(props) {
    const [upcomingDrives, setUpcomingDrives] = useState([]);
    const backend_url = "http://localhost:5000/tnp/getUpcomingDrives";

    useEffect(() => {
        const current_date = new Date().getTime();
        const data = {current_date};
        fetch(backend_url,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setUpcomingDrives(data.result);
        }).catch((err) => {
            console.log(err);
        })
    },[])



    return(
        <Container>
            <div>
                {upcomingDrives.length}
            </div>
        </Container>
    )
}