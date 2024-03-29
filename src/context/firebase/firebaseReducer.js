import { ADD_NOTE, DELETE_NOTE, FETCH_NOTES, SHOW_LOADER, EDIT_NOTE } from "../Types"

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_NOTE]:(state, {payload}) => ({
        ...state,
        notes:[...state.notes, payload]
    }),
    [FETCH_NOTES] : (state, {payload}) => ({ ...state, notes: payload, loading: false}),
    [DELETE_NOTE] : (state,{payload}) => ({
        ...state, 
        notes: state.notes.filter( note => note.id !== payload)
    }),
    DEFAULT: state => state,
}


export const firebaseReducer = ( state, action ) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}