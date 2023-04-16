import {  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit';

const middleware = [thunk, logger];

const store = configureStore({
    reducer:rootReducer    
});

export default store;
