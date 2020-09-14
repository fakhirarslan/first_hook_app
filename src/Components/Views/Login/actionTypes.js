export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const getUser = (data) => {
    return (dispatch) => {
        dispatch({ type: GET_USER, payload: data});
    }
}