import { combineReducers } from 'redux';
import { message } from 'antd';
import { setCookie, clearCookie } from '../app/uilts';

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return { isLoading: true };
    case 'LOGIN_FAILED':
      return { isLoading: false };
    case 'LOGIN_SUCCESS':
      setCookie('user', action.payload.username);
      return { isLoading: false, ...action.payload };
    case 'LOGIN_OUT':
      clearCookie('user');
      message.success('登出成功');
      return {
        username: '',
        password: '',
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  userInfo,
});

export default reducer;
