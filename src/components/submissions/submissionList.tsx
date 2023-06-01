import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { ISubmission } from ".";
import { AuthContext } from "../../contexts/AuthContext";

interface ISubmissionList {
    submissions: ISubmission[],
    isFetching: boolean
}

const SubmissionList = ({submissions, isFetching}: ISubmissionList) => {
    const { dispatch } = useContext(AuthContext);
    const [selected, setSelected] = useState<ISubmission>();

    useEffect(() => {
        dispatch({ type: "SUBMISSION_SELECTED", payload: selected})
    }, [selected]);

    return  (
        <ListGroup as="ol" numbered>
            {submissions.map(submission => (
                <ListGroup.Item as="li" 
                    className="d-flex justify-content-between align-items-start" 
                    key ={submission.id}
                    onClick = {() => setSelected(submission)}
                    active = {submission.id === selected?.id}
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{submission.title}</div>
                        {submission.code.substring(0, 100)}
                    </div>
                    {/* <Badge bg="primary" pill>
                    14
                    </Badge> */}
                </ListGroup.Item>)
            )}
            
        </ListGroup>
    )
} 

export default SubmissionList;