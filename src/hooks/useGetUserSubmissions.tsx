import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../components/authentication/firebase";
import { ISubmission } from "../components/submissions";

export const useGetUserSubmissions = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [submissions, setSubmissions] = useState<ISubmission[]>([]);

    const fetch = async (userId: string) => {
        setError(null);
        setIsFetching(true)
        try {
            const q = query(
                collection(db, "submissions"), 
                where("submission.uId", '==', userId));
            
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => {
                const submission = doc.data();
                return {...submission.submission, id: doc.id} as ISubmission 
            })
            
            setSubmissions(data)
            setIsFetching(false);
        } catch (error: any) {
            console.log(error)
            setError(error.message);
            setIsFetching(false);
        }
    }

    return { isFetching, error, submissions, fetch }
}