import { GET_SONG } from './audio.actionTypes';

const initialState = {
    song: []
}

export const songReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SONG:
            return {...state, song: action.payload}
        default:
            return state;
    }
}
