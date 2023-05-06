import React, { useRef } from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import '../styles/addCompanyStyles.css';

export default function AddCompanyDrive(props) {

    const company_name = useRef(null);
    const drive_type = useRef(null);
    const company_description = useRef(null);
    const pay_per_month = useRef(null);
    const [criteria, setCriteria] = useState({});
    const [criteria_name, setCriteriaName] = useState("");
    const [branches, setBranches] = useState([]);
    const [drive_deadline, setDriveDeadline] = useState(new Date());
    const link = useRef();
    const [val, setVal] = useState("");
    const backend_url = "http://localhost:5000/tnp/addcompany";
    const [error, setError] = useState(true);
    const [formerrors,setFormErrors] = useState({});
    const [response,setResponse] = useState("");
    const navigate = useNavigate();

    const saveCriteria = (e, crit, val) => {
        e.preventDefault();
        var temp = criteria;
        switch (crit) {
            case "10th Grade Score":
                temp.tenth = val;
                break;
            case "12th Grade Score":
                temp.twelth = val;
                break;
            case "CGPA":
                temp.cgpa = val;
                break;
            case "Amcat test score":
                temp.amcat = val;
                break;
        }

        console.log(temp);

        setCriteria(temp);
        setCriteriaName("");
    }

    const addBranch = (e, branch) => {
        e.preventDefault();
        if (!branches.includes(branch)) {
            setBranches((prevBranches) => [...prevBranches, branch]);
        }
    }

    const removeBranch = (e,branch) => {
        e.preventDefault();
        const temp_branches = branches.filter((br) => br != branch);
        setBranches(temp_branches);
    }

    const handleCreate = (e) => {
        e.preventDefault();

        var errors = {};
        var error_count = 0;
        if(drive_type.current.value === null || drive_type.current.value === "") {
            errors.driveError = "Select the company drive...";
            error_count += 1;
        }
        if(company_name.current.value === null || company_name.current.value === "") {
            errors.companyError = "Enter name of company...";
            error_count += 1;
        }
        if(pay_per_month.current.value === null || pay_per_month.current.value === "") {
            errors.payError = "Enter the company pay...";
            error_count += 1;
        }
        if(branches.length === 0) {
            error_count += 1;
            errors.branchError = "Enter all branches that can appear for this drive...";
        }
        if(link === "") {
            error_count += 1;
            errors.linkError = "Enter a link for students to register...";
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
            const final_drive = drive_type.current.value;
            const final_company = company_name.current.value;
            const final_description = company_description.current.value;
            const final_link = link.current.value;
            const final_pay = pay_per_month.current.value;
            const data = {final_drive, final_company, final_description, final_pay, branches, final_link,
            criteria, drive_deadline}
            fetch(backend_url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then((res) => {
                return res.json();
            }).then((re) => {
                setResponse(re.message);
            }).catch((err) => {
                console.log(err);
            })
        }
    },[error])

    useEffect(() => {
        if(response !== "") {
            setTimeout(() => {
                navigate("/");
            },700)
        }
    },[response])

    return (
        <Container>
            <h1>Fill the drive details...</h1>
            <Form className="form-container">
                <Form.Group>
                    <Form.Label>Drive</Form.Label>
                    <Form.Select ref={drive_type}>
                        <option>Select drive type</option>
                        <option value="internship">Internship</option>
                        <option value="placement">Placement</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Company Name:</Form.Label>
                    <Form.Control ref={company_name} type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Company Description</Form.Label>
                    <Form.Control ref={company_description} type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pay per month</Form.Label>
                    <Form.Control ref={pay_per_month} type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Add company criteria</Form.Label>
                    <Form.Select onChange={(e) => { setCriteriaName(e.target.value) }}>
                        <option>Select company criteria</option>
                        <option value="10th Grade Score">10th Grade Score</option>
                        <option value="12th Grade Score">12th Grade Score</option>
                        <option value="CGPA">CGPA</option>
                        <option value="Amcat test score">Amcat test score</option>
                    </Form.Select>
                </Form.Group>
                {criteria_name !== "" && criteria_name !== "Select company criteria" &&
                    <div>
                        {criteria_name}:
                        <Form.Control type="text" onChange={(e) => { setVal(e.target.value) }} />
                        <Button onClick={(e) => { saveCriteria(e, criteria_name, val) }}>Save</Button>
                        <Button onClick={(e) => { setCriteriaName("") }}>Cancel</Button>
                    </div>
                }
                <Form.Group>
                    <Form.Label>Pick a deadline for this form: </Form.Label>
                    <br></br>
                    <DatePicker selected={drive_deadline}
                        onChange={setDriveDeadline}
                        value={drive_deadline}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Select the branches that can appear for this drive:</Form.Label>
                    <Form.Select onChange={(e) => { addBranch(e, e.target.value) }}>
                        <option>Select Branch</option>
                        <option value="computer">Computer</option>
                        <option value="it">IT</option>
                        <option value="entc">ENTC</option>
                    </Form.Select>
                </Form.Group>

                <div>
                    {branches.map((branch) => (
                        <div>
                            {branch}
                            <Button onClick={(e) => {removeBranch(e,branch)}}>Remove</Button>
                        </div>
                    ))}
                </div>

                <Form.Group>
                    <Form.Label>Add link for registration:</Form.Label>
                    <Form.Control ref={link} type="text"/>
                </Form.Group>
                <Button onClick={(e) => {handleCreate(e)}}>Create</Button>
                <br></br><br></br><br></br>
            </Form>
            <div>{response}</div>
        </Container>
    )
}