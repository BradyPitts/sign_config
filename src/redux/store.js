import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import dataReducer from './dataReducer';
// import userReducer from './userReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  // user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));