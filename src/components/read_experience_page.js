import React from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RangeSlider from 'react-bootstrap-range-slider';
import '../styles/readexperienceStyles.css';
import { setCompanyData } from "../redux/companySlice";

export default function ReadExperience(props) {
    const [filters, setFilters] = useState({});
    const [companies, setCompanies] = useState([]);
    const [drive, setDrive] = useState([]);
    const [min_compensation, setMinCompensation] = useState(0);
    const [max_compensation, setMaxCompensation] = useState(0);
    const [filtered_skills, setFilteredSkills] = useState([]);
    const [selected_skills, setSelectedSkills] = useState([]);
    const [skill, setSkill] = useState();
    const [retrieved_companies, setRetrievedCompanies] = useState([]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const backend_url = "http://localhost:5000/experience/get";

    const company_array = ['BMC Software', 'Mastercard', 'Barclays', 'Deustche Bank', 'UBS', 'Tracelink', 'Altomata', 'Druva'
        , 'Cognizant', 'ZS Associates', 'PhonePe', 'BNY Mellon','Servicenow','Salesforce','Epam Systems'];

    const skill_set = ['c++', 'java', 'python', 'javascript', 'reactjs', 'anuglarjs', 'vuejs', 'nextjs', 'nodejs', 'expressjs', 'django', 'c#',
        'problem solving', 'mysql', 'mongodb', '.net', 'laravel', 'apache pyspark', 'apache hadoop', 'cloud', 'aws', 'azure', 'gcp',
        'data science', 'machine learning', 'ai', 'data analytics', 'powerbi', 'microsoft office', 'adobe']


    const handleCheckBox = (e, filter_name, value) => {
        switch (filter_name) {
            case "company":
                if (e.target.checked) {
                    setCompanies((comp) => [...comp, value.toLowerCase()]);
                }
                else {
                    const temp_companies = companies.filter((company) => company != value.toLowerCase());
                    setCompanies(temp_companies);
                }
                break;
            case "drive":
                if (e.target.checked) {
                    setDrive((prev_drives) => [...prev_drives, value]);
                }
                else {
                    const temp_drives = drive.filter((drv) => drv != value);
                    setDrive(temp_drives);
                }
                break;

        }
    }

    const addSkill = (e,skl) => {
        e.preventDefault();
        setSelectedSkills((prev_skills) => [...prev_skills,skl]);
    }

    const removeSkill = (e,skl) => {
        e.preventDefault();
        const temp_skills = selected_skills.filter((sk) => sk != skl);
        setSelectedSkills(temp_skills);
    }

    useEffect(() => {
        const data = {};
        if(companies.length > 0) {
            console.log(companies);
            data.companies = companies;
        }
        if(drive.length > 0) {
            data.drive = drive;
        }
        if(min_compensation > 0) {
            data.min_compensation = min_compensation;
        }
        if(max_compensation > 0) {
            data.max_compensation = max_compensation;
        }
        if(selected_skills.length > 0) {
            data.skills = selected_skills;
        }

        if(Object.keys(data).length > 0) {
            fetch(backend_url,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data['company_data']);
                setRetrievedCompanies(data['company_data']);
            }).catch((err) => {
                console.log(err);
            })
        }
        else{
            setRetrievedCompanies([]);
        }

    }, [companies, drive, min_compensation, max_compensation,selected_skills])

    useEffect(() => {
        const temp_skills = skill_set.filter((skll) => skll.includes(skill));
        setFilteredSkills(temp_skills);
    },[skill])

    const goToCompanyPage = (e,company) => {
        e.preventDefault();
        
        dispatch(setCompanyData({username:company.username,company_data:company}));
        navigate(`/company/${company.username}/${company.company_name}`);
    }

    return (
        <div className="content-container">
            <div className="filters">
                <div>Companies: </div>
                {company_array.map((company) => (
                    <Form.Check defaultValue={company} label={company} onChange={(e) => { handleCheckBox(e, "company", company) }} />
                ))}
                <br></br>
                <div>Drive: </div>
                {['Internship', 'Placement'].map((drv) => (
                    <Form.Check defaultValue={drv} label={drv} onChange={(e) => { handleCheckBox(e, "drive", drv) }} />
                ))}
                <Form.Label>Min Salary:</Form.Label>
                <Form.Control className="salaryField" type="text" onChange={(e) => { setMinCompensation(e.target.value) }} />
                <Form.Label>Max Salary:</Form.Label>
                <Form.Control className="salaryField" type="text" onChange={(e) => { setMaxCompensation(e.target.value) }} />
                <div>Filter by skills: </div>
                <Form.Control type="text" onChange={(e) => { setSkill(e.target.value) }} />
                <div>
                    {filtered_skills.map((skl) => (
                        <div style={{"cursor":"pointer"}} onClick={(e) => addSkill(e,skl)}>{skl}</div>
                    ))}
                </div>
                <div>
                    {selected_skills.length > 0 && <div>Selected Skills: </div>}
                    {selected_skills.map((selec_skill) => (
                        <div>
                            {selec_skill} 
                            <Button onClick={(e) => removeSkill(e,selec_skill)}>Remove</Button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="data">
                {retrieved_companies.length > 0 ? 
                retrieved_companies.map((company) => (
                    <div className="experience-container">
                        <div>Created by: {company.username}</div>
                        <div>Company: {company.company_name}</div>
                        <Button onClick={(e) => goToCompanyPage(e,company)}>Read Experience</Button>
                        <Button>Save</Button>
                    </div>
                )) : <div>None...</div>}
            </div>
        </div>
    )
}