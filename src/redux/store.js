import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reduer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;