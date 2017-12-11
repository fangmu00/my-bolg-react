import { createStore } from 'redux';
import reducer from '../reducers';

const defaultState = {
  userInfo: {
    username: '',
    password: '',
  },
};

export default createStore(reducer, defaultState);
