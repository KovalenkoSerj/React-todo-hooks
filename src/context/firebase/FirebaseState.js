import React, { useReducer } from 'react'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import axios from 'axios';
import { ADD_NOTE, DELETE_NOTE, FETCH_NOTES, SHOW_LOADER } from '../Types';


export const FirebaseState = ({ children }) => {
    const url = process.env.REACT_APP_DB_URL;
    const initialState = {
        notes: [],
        loading: false
    }


const showLoader = () => dispatch({type: SHOW_LOADER});


const fetchNotes = async () => {
    showLoader();
    const response = await axios.get(`${url}/notes.json`);
    const payload = Object.keys(response.data).map(key => {
        return {
            ...response.data[key],
            id: key
        }
    })
    dispatch({
        type: FETCH_NOTES,
        payload
    })
}

const addNotes = async title => {
    const note = {
        title, date: new Date().toJSON()

    }

    try {
        const response = await axios.post(`${url}/notes.json`, note)
        const payload = {
            ...note,
            id: response.data.name
        }
        dispatch({
            type: ADD_NOTE,
            payload
        })
    }catch (e){
        throw new Error(e.message)
    }

    
}

const removeNote = async id => {
    await axios.delete(`${url}/notes/${id}.json`)
    dispatch({type: DELETE_NOTE, payload: id});
}

    const [state, dispatch] = useReducer(firebaseReducer, initialState)
    return (
        <FirebaseContext.Provider value={{
            showLoader, addNotes, removeNote,fetchNotes,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )
} 