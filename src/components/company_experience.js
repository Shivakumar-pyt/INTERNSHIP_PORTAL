import React from "react";
import { useState, useEffect, useParams } from "react";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RangeSlider from 'react-bootstrap-range-slider';
import '../styles/companyExperienceStyles.css';

export default function CompanyExperience(props) {

    const company_data = useSelector((state) => state.company.company_data);
    const backend_url = 'http://localhost:5000/experience/save';
    const [saved,setSaved] = useState("");
    
    const saveExperience = (e) => {
        e.preventDefault();
        fetch(backend_url,{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(company_data)
        }).then((res) => {
            return res.json();
        }).then((r) => {
            setSaved(r.message);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Container className="container">
            <div>Written By: {company_data.username}</div>
            <div>{company_data.company_name} {company_data.drive} experience in PICT</div>
            {company_data.description !== undefined && <div>About Company: {company_data.description}</div>}
            <div>Compensation offered by company: {company_data.compensation} /mon</div>
            <div>
                {company_data.rounds_info.map((info, i) => (
                    <div key={i}>Round {i + 1}: {info.round_type}
                        {info.round_type === "Coding Round" &&
                            <div>
                                Topics asked in coding round:
                                <ul>
                                    {info.topics.map((topic) => (
                                        <li>{topic}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                        <div>
                            Round Description:
                            <p>{info.experience}</p>
                            Overall Diffculty Level:
                            <p>{info.difficulty}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                Total students who appeared for the round: {company_data.total_students}<br></br>
                Students who got {company_data.drive} out of {company_data.total_students}: {company_data.selected_count}
            </div>
            <div>
                Skill that the company demands:
                <ul className="skill-list">
                    {
                        company_data.skills.map((skill) => (
                            <li>{skill}</li>
                        ))
                    }
                </ul>
            </div>
            <Button onClick={(e) => {saveExperience(e)}}>Save Experience</Button>

            {saved.length > 0 && <div style={{color: 'green'}}>{saved}</div>}

        </Container>
    )
}