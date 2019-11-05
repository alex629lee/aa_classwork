import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer.js';
import logger from 'redux-logger';
import thunk from '../middleware/thunk';

// const preLoadedState = {};

const configureStore = () => (
  createStore(
    rootReducer,
    // preLoadedState,
    applyMiddleware(thunk, logger)
  )
);


export default configureStore;


