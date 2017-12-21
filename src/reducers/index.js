import { combineReducers } from 'redux';
import { message } from 'antd';
import { browserHistory } from 'react-router';

import { clearCookie } from '../app/uilts';

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return { isLoading: true };
    case 'LOGIN_FAILED':
      return { isLoading: false };
    case 'LOGIN_SUCCESS':
      return { isLoading: false, ...action.payload };
    case 'LOGIN_OUT':
      clearCookie('user');
      clearCookie('userId');
      message.success('登出成功');
      return {
        username: '',
        password: '',
      };
    default:
      return state;
  }
};

const article = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLE_LOADING':
      return { isLoading: true };
    case 'ARTICLE_EDIT_FAILED':
      return { isLoading: false };
    case 'ARTICLE_EDIT_SUCCESS':
    {
      const { operationCode } = action.payload;
      if (operationCode === 'add') {
        browserHistory.push('/ArticleList');
      }
      return { isLoading: false };
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  userInfo,
  article,
});

export default reducer;
