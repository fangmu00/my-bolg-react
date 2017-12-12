import { message } from 'antd';
import Fetch from '../app/uilts/fetch';

Fetch.set({
  login: 'user/login',
});

export const login = params => (dispatch) => {
  dispatch({ type: 'LOGIN_LOADING' });
  Fetch.post('login', params).then((content) => {
    if (content.isSuccess) {
      message.success(content.message);
      dispatch({ type: 'LOGIN_SUCCESS', payload: params });
    } else {
      dispatch({ type: 'LOGIN_FAILED' });
    }
  });
};

export const creator = ({ type, payload = '' }) => ({
  type,
  payload,
});

const actions = [];

export default actions;
