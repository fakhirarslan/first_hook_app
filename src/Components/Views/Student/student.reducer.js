import { GET_STUDENT, GET_STUDENT_LOADING } from './student.actionTypes';

const initialState = {
    student: []
}

export const studentReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_STUDENT:
            return {...state, student: action.payload}
        case GET_STUDENT_LOADING:
          return {...state, student: action.payload}
        default:
            return state;
    }
}
