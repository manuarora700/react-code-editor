import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useGetUserSubmissions } from '../../hooks/useGetUserSubmissions';
import SubmissionList from './submissionList';

export interface ISubmission {
    id: string,
    uId: string,
    title?: string,
    code: string,
    languageId: number,
    createdAt: string,
    modifiedAt: string
}

const Submission = () => {
    const { user } = useContext(AuthContext);

    const { isFetching, fetch, submissions } = useGetUserSubmissions()
     
    useEffect(() => {
        if (user) {
            fetch(user.uid)
        }
    }, [user])

    return (
        <SubmissionList submissions={submissions} isFetching={isFetching} />
    )
}

export default Submission;