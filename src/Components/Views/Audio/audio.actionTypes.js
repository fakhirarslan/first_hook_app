export const GET_SONG = 'GET_SONG';
export const GET_SONG_SUCCESS = 'GET_SONG_SUCCESS';
export const GET_SONG_FAILURE = 'GET_SONG_FAILURE';

export const getSong = (data) => {
    return (dispatch) => {
        dispatch({ type: GET_SONG, payload: data});
    }
}
