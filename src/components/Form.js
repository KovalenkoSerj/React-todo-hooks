import React, {useState, useContext} from 'react'
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const firebase = useContext(FirebaseContext)



    const submitHandler = e => {
        e.preventDefault();
        if(value.trim()){
            firebase.addNotes(value.trim())
            .then(() => {
                alert.show('Note added', 'success')
            }).catch(()=>{
                alert.show('Something went wrong, please try again', 'danger')
            })
            setValue('')
        }else {
            alert.show('Please, enter the name of the note')
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder='Text input' value={value} onChange={e => setValue(e.target.value) }/>
            </div>
        </form>
    )
}