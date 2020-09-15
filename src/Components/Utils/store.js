import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from '../Views/Login/login.reducer';

export const store = createStore(
    combineReducers({
        user: userReducer
    }),
    applyMiddleware(thunk)
);
