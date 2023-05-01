import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SkillsInfo({ skillInfoDone, selected_skills, setSelectedSkills }) {

    const [skill, setSkill] = useState("");
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [formerrors, setFormErrors] = useState({});
    const [error, setError] = useState(true);

    const skill_set = ['c++', 'java', 'python', 'javascript', 'reactjs', 'anuglarjs', 'vuejs', 'nextjs', 'nodejs', 'expressjs', 'django', 'c#',
        'problem solving', 'mysql', 'mongodb', '.net', 'laravel', 'apache pyspark', 'apache hadoop', 'cloud', 'aws', 'azure', 'gcp',
        'data science', 'machine learning', 'ai', 'data analytics', 'powerbi', 'microsoft office', 'adobe']

    useEffect(() => {
        if (skill.length > 0) {
            const skl = skill.toLowerCase();

            const possible_skills = skill_set.filter((sk) => sk.includes(skl));

            setFilteredSkills(possible_skills);
        }

    }, [skill])

    const addSkill = (new_skill) => {
        if (!selected_skills.includes(new_skill)) {
            setSelectedSkills((prev_skills) => [...prev_skills, new_skill]);
        }
    }

    const removeSkill = (remove_skill) => {
        var currentSkills = selected_skills.filter((sk) => sk != remove_skill);
        setSelectedSkills(currentSkills);
    }

    const skillSaved = (e) => {
        e.preventDefault(0);
        var error_count = 0;
        var errors = {};

        if (selected_skills.length === 0) {
            error_count += 1;
            errors.skillError = "Add atleast one skill that the company requires...";
        }

        if (error_count === 0) {
            setError(false);
        }
        else {
            setFormErrors(errors);
        }

    }

    useEffect(() => {
        if (!error) {
            skillInfoDone();
        }
    }, [error])

    return (
        <Container>
            <div>Enter the skills that the company required...</div>
            <Form>
                <Form.Group>
                    <Form.Control type="text" onChange={(e) => { setSkill(e.target.value) }} />
                </Form.Group>
                <div>
                    {filteredSkills.map((sk) => (
                        <div onClick={(e) => addSkill(sk)} style={{ "cursor": "pointer" }}>{sk}</div>
                    ))}
                </div>
            </Form>

            <div>{formerrors.skillError}</div>


            <div>
                {selected_skills.length > 0 && <p>Selected Skills: </p>}
                {selected_skills.map((sk) => (
                    <div>
                        <div>{sk}</div>
                        <Button onClick={(e) => removeSkill(sk)}>Remove</Button>
                    </div>
                ))}
            </div>
            <Button onClick={(e) => skillSaved(e)}>Next</Button>
        </Container>
    )
}