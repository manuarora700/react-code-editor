import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../components/authentication/firebase";
import { ISubmission } from "../components/submissions";

export const useSaveSubmission = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const submit = async (submission: ISubmission) => {
        setError(null);
        setIsSubmitting(true)
        try {
            await addDoc(collection(db, "submissions"), {
                submission: {...submission, createdAt: new Date()}
            })
            setIsSubmitting(false)
        } catch (error: any) {
            console.log(error)
            setError(error.message);
            setIsSubmitting(false);
        }
    }

    return { isSubmitting, error, submit }
}