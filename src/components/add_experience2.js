import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoundsInfo from "./rounds_info";
import SkillsInfo from "./skills_info";
import GeneralInfo from "./general_info";

export default function AddExperience2(props) {

    const params = useParams();
    const username = params.username;

    const [basicInfoFilled, setBasicInfoFilled] = useState(false);
    const [roundsInfoFilled, setRoundsInfoFilled] = useState(false);
    const [skillInfoFilled, setSkillInfoFilled] = useState(false);
    const [generalInfoFilled, setGeneralInfoFilled] = useState(false);

    const [company_name,setCompanyName] = useState();
    const [drive,setDrive] = useState();
    const [compensation, setCompensation] = useState();
    const [description, setDescription] = useState();

    const [rounds, setRounds] = useState("");
    const [total_students, setTotalStudents] = useState();
    const [selected_students, setSelectedStudents] = useState();
    const [selected_skills, setSelectedSkills] = useState([]);
    const [tips, setTips] = useState();
    const [formerrors, setFormErrors] = useState({});
    const [errorExist, setErrorExist] = useState(true);
    const [roundsInfo, setRoundsInfo] = useState([]);

    const navigate = useNavigate();

    const backend_url = "http://localhost:5000/experience/add";

    function roundsInfoDone() {
        setRoundsInfoFilled(true);
    }
    function skillInfoDone() {
        setSkillInfoFilled(true);
    }
    function generalInfoDone() {
        setGeneralInfoFilled(true);
    }

    const handleClick = (e) => {
        e.preventDefault();
        var errors = {};
        var error_count = 0;
        if (company_name=== undefined || company_name=== "") {
            error_count += 1;
            errors.companyNameError = "Specify the name of the company...";
        }
        if (drive=== undefined || drive === "") {
            error_count += 1;
            errors.driveError = "Specify the type of the drive that the company conducted...";
        }
        if (compensation=== undefined || compensation === "") {
            error_count += 1;
            errors.compensationError = "Specify the per month compensation of the company...";
        }

        if (error_count === 0) {
            setErrorExist(false);
        }
        else {
            setFormErrors(errors);
        }
    }

    useEffect(() => {
        if (!errorExist) {
            setBasicInfoFilled(true);
        }
    }, [errorExist])

    useEffect(() => {
        if(basicInfoFilled && roundsInfoFilled && skillInfoFilled && generalInfoFilled) {

            const data = {username, company_name, drive, compensation, description, rounds, roundsInfo, selected_skills,
            total_students, selected_students, tips};
            
            fetch(backend_url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then((res) => {
                return res.json();
            }).then((data) => {
                alert("Exeprience Saved Successfully...")
                navigate("/")
            }).catch((err) => {
                console.log(err);
            })
        }
    },[basicInfoFilled, roundsInfoFilled, skillInfoFilled, generalInfoFilled])

    return (
        <div>
            {(() => {
                if (!basicInfoFilled && !roundsInfoFilled && !skillInfoFilled && !generalInfoFilled) {
                    return (
                        <Container>
                            <h1>Company Experience Form...</h1>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control type="text" placeholder="e.g. Mastercard" onChange={(e) => {setCompanyName(e.target.value)}}/>
                                    <Form.Text>{formerrors.companyNameError}</Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Type of Drive</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => {setDrive(e.target.value)}}>
                                        <option>Select company drive</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Placement">Placement</option>
                                    </Form.Select>
                                    <Form.Text>{formerrors.driveError}</Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Compensation offered by company per month</Form.Label>
                                    <Form.Control type="text" placeholder="e.g. 20000" onChange={(e) => {setCompensation(e.target.value)}} />
                                    <Form.Text>{formerrors.compensationError}</Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Company Description</Form.Label>
                                    <Form.Control as="textarea" onChange={(e) => {setDescription(e.target.value)}}/>
                                </Form.Group>
                                <Button onClick={(e) => handleClick(e)}>Next</Button>
                            </Form>
                        </Container>
                    )
                }

                if (basicInfoFilled && !roundsInfoFilled && !skillInfoFilled && !generalInfoFilled) {
                    return (
                        <RoundsInfo roundsInfoDone={roundsInfoDone} rounds={rounds} setRounds={setRounds} setRoundsInfo={setRoundsInfo} roundsInfo={roundsInfo} />
                    )
                }

                if (basicInfoFilled && roundsInfoFilled && !skillInfoFilled && !generalInfoFilled) {
                    return (
                        <SkillsInfo skillInfoDone={skillInfoDone} selected_skills={selected_skills} setSelectedSkills={setSelectedSkills} />
                    )
                }

                if (basicInfoFilled && roundsInfoFilled && skillInfoFilled && !generalInfoFilled) {
                    return (
                        <GeneralInfo generalInfoDone={generalInfoDone} total_students={total_students} setTotalStudents={setTotalStudents}
                            setTips={setTips} selected_students={selected_students} setSelectedStudents={setSelectedStudents} />
                    )
                }

            })()}
        </div>


    )
}