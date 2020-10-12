import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const Notes = ({ notes, onDelete }) => (
    <TransitionGroup  className='list-group' component='ul'>
        {notes.map(note => {
            return (
                <CSSTransition key={note.id}
                    classNames={'note'}
                    timeout={1000}
                >
                    <li className="list-group-item note"  >
                        <div className='note-container'>
                            <strong>{note.title}</strong>
                            <small>{note.date}</small>
                        </div>
                        <button onClick={() => onDelete(note.id)} className='btn btn-outline-danger btn-sm'> &times; </button>
                    </li>
                </CSSTransition>
            )
        })}
    </TransitionGroup>
)