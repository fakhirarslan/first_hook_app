export const GET_STUDENT = 'GET_STUDENT';
export const GET_STUDENT_SUCCESS = 'GET_STUDENT_SUCCESS';
export const GET_STUDENT_FAILURE = 'GET_STUDENT_FAILURE';
export const GET_STUDENT_LOADING = 'GET_STUDENT_LOADING';

export const getStudent = (data) => {
    return (dispatch) => {
        dispatch({ type: GET_STUDENT, payload: data});
    }
}

export const getStudentLoading = (data) => {
  return (dispatch) => {
      dispatch({ type: GET_STUDENT_LOADING, payload: data});
  }
}
