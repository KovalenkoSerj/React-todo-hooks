import React, { useContext, useEffect } from 'react';
import { Form } from '../components/Form';
import { Notes } from '../components/Notes'
import { Loader } from '../components/Loader'
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Home = () => {


    const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext);
    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Form />
            <hr />
            {
                loading ?
                    <Loader />
                    :
                    <Notes notes={notes} onDelete={removeNote} />
            }
        </>
    )
}