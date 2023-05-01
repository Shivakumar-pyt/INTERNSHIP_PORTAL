import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar, Image, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RoundsInfo({ roundsInfoDone, rounds, setRounds, roundsInfo, setRoundsInfo }) {
    const roundDescription = useRef();
    const roundDifficulty = useRef();
    const [formerrors, setFormErrors] = useState({});
    const [error, setError] = useState(true);
    const [addClick, setAddClick] = useState(false);
    const [roundExpAdded, setRoundsExpAdded] = useState(0);
    const [codingRoundTopics, setCodingRoundTopics] = useState([]);
    const [roundType, setRoundType] = useState("");

    const dsa_topics = ["DP", "Graph", "Greedy","Tree","Array","String","Sliding Window","Two Pointers","Searching Sorting"
                            ,"Matrix"]

    const roundsSubmit = (e) => {
        e.preventDefault();
        var errors = {};
        var error_count = 0;
        if (rounds === undefined || rounds === "") {
            error_count += 1;
            errors.roundError = "Specify number of rounds...";
        }
        if(roundsInfo.length === 0) {
            error_count += 1;
            errors.roundInfoError = "Give atleast one round experience...";
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
            roundsInfoDone();
        }
    }, [error])

    const addCodingTopic = (topic) => {
        console.log(topic);
        if(!codingRoundTopics.includes(topic)) {
            setCodingRoundTopics((prev_topics) => [...prev_topics,topic]);
        }
    }

    const removeCodingTopic = (topic) => {
        const new_topic_array = codingRoundTopics.filter((tps) => tps != topic);
        setCodingRoundTopics(new_topic_array);
    }

    const roundSave = () => {
        setRoundsExpAdded(roundExpAdded => roundExpAdded+1);
        setAddClick(false);


        if(roundType === "Coding Round") {
            setRoundsInfo((prev_info) => 
            [...prev_info, {round_type: roundType, topics: codingRoundTopics, experience: roundDescription.current.value, difficulty: roundDifficulty.current.value}])
        }
        else{
            setRoundsInfo((prev_info) => 
                [...prev_info, {round_type: roundType, experience: roundDescription.current.value, difficulty: roundDifficulty.current.value}]
            )
        }
    }


    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>No. of interview rounds</Form.Label>
                    <Form.Control type="text" onChange={(e) => { setRounds(e.target.value) }} />
                    <Form.Text>{formerrors.roundError}</Form.Text>
                </Form.Group>
                {rounds !== "" && rounds !== undefined && roundExpAdded < parseInt(rounds) &&
                    <Button onClick={(e) => setAddClick(true)}>Add Interview Experience</Button>
                }

                {addClick &&
                    <Form.Group>
                        <Form.Select onChange={(e) => { setRoundType(e.target.value) }}>
                            <option>Select Type of round</option>
                            <option value="Coding Round">Coding Round</option>
                            <option value="Hackathon">Hackathon</option>
                            <option value="Technical Interview">Technical Interview</option>
                            <option value="HR Round">HR Round</option>
                        </Form.Select>

                        {formerrors.roundInfoError}

                        {roundType === "Coding Round" &&
                            <div>
                                <Form.Select onChange={(e) => addCodingTopic(e.target.value)}>
                                    <option>Select DSA topics that were asked</option>
                                    {dsa_topics.map((topic) => (
                                        <option value={topic}>{topic}</option>
                                    ))}
                                </Form.Select>
                                <Form.Text>
                                    Topics:
                                    {codingRoundTopics.map((topic) => (
                                        <div>{topic}
                                            <Button onClick={(e) => {removeCodingTopic(topic)}}>Remove</Button>
                                        </div>
                                    ))}
                                </Form.Text>
                            </div>
                        }

                        <Form.Label>Describe your experience of this round: </Form.Label>
                        <Form.Control as="textarea" ref={roundDescription}/>
                        <Form.Select ref={roundDifficulty}>
                            <option>Select difficulty of this round</option>
                            <option>Easy</option>
                            <option>Moderate</option>
                            <option>Hard</option>
                        </Form.Select>
                        <Button onClick={roundSave}>Save</Button>
                    </Form.Group>
                }

                {roundExpAdded === parseInt(rounds) && 
                    <div>Experiences of all rounds saved... You may proceed...</div>
                }

                <Button onClick={(e) => roundsSubmit(e)}>Next</Button>
            </Form>
        </Container>
    )
}