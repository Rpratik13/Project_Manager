import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

const THUNK_MIDDLEWARE = require('redux-thunk').default;

const store = createStore(reducer, applyMiddleware(THUNK_MIDDLEWARE));

export default store;