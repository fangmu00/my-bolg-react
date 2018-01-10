import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import { getCookie } from '../app/uilts';

const defaultState = {
  userInfo: {
    username: getCookie('user'),
    password: '',
    isLoading: false,
  },
};

export default createStore(reducer, defaultState, applyMiddleware(thunk));
