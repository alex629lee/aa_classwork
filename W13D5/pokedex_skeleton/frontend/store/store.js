import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer.js';
import logger from 'redux-logger';

const configureStore = () => createStore(rootReducer, applyMiddleware(logger));

export default configureStore;


