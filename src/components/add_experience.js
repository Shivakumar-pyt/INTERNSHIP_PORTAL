import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddExperience(props) {
    const params = useParams();
    const username = params.username;

    const company = useRef();
    const drive = useRef();
    const rounds = useRef();
    const compensation = useRef();
    const description = useRef();
    const total_students = useRef();
    const selected_students = useRef();
    const tips = useRef();
    const difficulty = useRef();
    const [skill, setSkill] = useState("");
    const [selected_skills, setSelectedSkills] = useState([]);
    const [filtered_skills, setFilteredSkills] = useState([]);
    const [errorsExist, setErrorsExist] = useState(true);
    const [formerrors,setFormErrors] = useState({});
    const backend_url = "http://localhost:5000/experience/add";

    const skill_set = ['c++', 'java', 'python', 'javascript', 'reactjs', 'anuglarjs', 'vuejs' ,'nextjs', 'nodejs', 'expressjs', 'django', 'c#',
    'problem solving', 'mysql', 'mongodb','.net','laravel','apache pyspark','apache hadoop','cloud','aws','azure','gcp',
    'data science','machine learning','ai','data analytics', 'powerbi', 'microsoft office','adobe']

    const addSkill = (new_skill) => {
        setSelectedSkills((prev_skills) => [...prev_skills, new_skill])
    }

    const removeSkill = (remove_skill) => {
        var current_skills = selected_skills.filter((skl) => skl != remove_skill);
        setSelectedSkills(current_skills)
    }

    useEffect(() => {
        const skl = skill.toLowerCase();
        var fil_skills = skill_set.filter((sk) => sk.includes(skl));
        setFilteredSkills(fil_skills);
    },[skill])

    const saveExperience = (e) => {
        e.preventDefault();
        var error = {};
        var error_count = 0;
        if(company.current.value === undefined || company.current.value === "") {
            error_count += 1;
            error.companyError = "Company name is mandatory...";
        }
        if(drive.current.value === undefined || drive.current.value === "") {
            error_count += 1;
            error.driveError = "Please select the drive...";
        }
        if(rounds.current.value === undefined || rounds.current.value === "") {
            error_count += 1;
            error.roundError = "Please specify number of rounds...";
        }
        if(compensation.current.value === undefined || compensation.current.value === "") {
            error_count += 1;
            error.compensationError = "Please specify the CTC or stipend offered by the company...";
        }
        if(selected_students.current.value === undefined || selected_students.current.value === "")  {
            error_count += 1;
            error.studentError = "Please specify the number of students that were selected...";
        }
        if(selected_skills.length === 0) {
            error_count += 1;
            error.skillError = "Please specify atleast one required skill...";
        }

        if(error_count === 0) {
            setErrorsExist(false);
        }
        else{
            setFormErrors(error);
        }
    }

    useEffect(() => {
        if(!errorsExist) {
            const final_company_name = company.current.value;
            const final_drive = drive.current.value;
            const final_compensation = compensation.current.value;
            const final_description = description.current.value;
            const final_rounds = rounds.current.value;
            const final_total_students = total_students.current.value;
            const final_selected_students = selected_students.current.value;
            const final_tips = tips.current.value;
            const final_difficulty = difficulty.current.value;
            
            const data = { username, final_company_name, final_drive, final_rounds, final_compensation, final_description, final_total_students,
            final_selected_students,final_tips, final_difficulty, selected_skills};

            fetch(backend_url, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
        } 
    },[errorsExist])

    return (
        <div className="form-container">
            <h1>Company Experience</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control ref={company} type="text" />
                    <Form.Text>{formerrors.companyError}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select drive</Form.Label>
                    <Form.Select ref={drive} aria-label="Default select example">
                        <option>Select company drive</option>
                        <option value="Internship">Internship</option>
                        <otion value="Placement">Placement</otion>
                    </Form.Select>
                    <Form.Text>{formerrors.driveError}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Compensation offered by company:</Form.Label>
                    <Form.Control ref={compensation} type="text"/>
                    <Form.Text>{formerrors.compensationError}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>No. of Rounds: </Form.Label>
                    <Form.Control ref={rounds} type="text"/>
                    <Form.Text>{formerrors.roundError}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Elaborate on your experience in these rounds: </Form.Label>
                    <Form.Control as="textarea" ref={description} type="textarea"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Total students who appeared for this drive: </Form.Label>
                    <Form.Control ref={total_students} type="text"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>How many students were selected? </Form.Label>
                    <Form.Control ref={selected_students} type="text"/>
                    <Form.Text>{formerrors.studentError}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter all required skills: </Form.Label>
                    {filtered_skills.length}
                    <Form.Control type="text" onChange={(e) => {setSkill(e.target.value)}}/>
                    <div>
                        {skill.length > 0 && 
                            filtered_skills.map((skill) => (
                                <div style={{"cursor": "pointer"}} onClick={(e) => addSkill(skill)}>{skill}</div>
                            ))
                        }
                    </div>
                    <br></br>
                    <div>
                        Selected Skills: 
                        {selected_skills.length > 0 && 
                            selected_skills.map((skill) => (
                                <div>
                                    <div>{skill}</div>
                                    <Button onClick={(e) => {removeSkill(skill)}}>Remove</Button>
                                </div>
                            ))
                        }
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Overall level of difficulty: </Form.Label>
                    <Form.Select ref={difficulty} aria-label="Default select example">
                        <option>Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Hard">Hard</option>
                    </Form.Select>
                    <Form.Text>{formerrors.skillError}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Additional Tips: </Form.Label>
                    <Form.Control as="textarea" type="text" ref={tips}/>
                </Form.Group>
                <Button onClick={(e) => {saveExperience(e)}}>Save Experience</Button>
            </Form>
        </div>
    )
}