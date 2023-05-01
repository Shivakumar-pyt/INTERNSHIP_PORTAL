import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GeneralInfo({ generalInfoDone, total_students, setTotalStudents, setTips, selected_students, setSelectedStudents }) {

    const [formerrors,setFormErrors] = useState({});
    const [error,setError] = useState(true);
    const generalInfoSave = (e) => {
        e.preventDefault();
        var error_count = 0;
        var errors = {};

        if(total_students === undefined || total_students === "") {
            error_count += 1;
            errors.totalStudentError = "Specify the total students for the drive...";
        }
        if(selected_students === undefined || selected_students === "") {
            error_count += 1;
            errors.selectedStudentError = "Specify number of selected students...";
        }

        if(error_count === 0) {
            setError(false);
        }
        else{
            setFormErrors(errors);
        }
    }

    useEffect(() => {
        if(!error) {
            generalInfoDone();
        }
    },[error])

    return (
        <Container>
            <h1>Last step of this form...</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Total students appeared for the drive...</Form.Label>
                    <Form.Control type="text" onChange={(e) => setTotalStudents(e.target.value)}/>
                    <Form.Text>{formerrors.totalStudentError}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Total selected students out of {total_students} students:</Form.Label>
                    <Form.Control type="text" onChange={(e) => {setSelectedStudents(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Additional tips:</Form.Label>
                    <Form.Control as="textarea" onChange={(e) => {setTips(e.target.value)}}/>
                    <Form.Text>{formerrors.selectedStudentError}</Form.Text>
                </Form.Group>
                <Button onClick={(e) => generalInfoSave(e)}>Next</Button>
            </Form>
        </Container>
    )
}