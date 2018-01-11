import { combineReducers } from 'redux';
import { message } from 'antd';

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
      clearCookie('name');
      clearCookie('blogToken');
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
      return { id: action.payload.id };
    case 'GET_ARTICLE_SUCCESS':
    {
      const {
        id, type, name, content, updateTime,
      } = action.payload;
      return {
        id,
        type,
        name,
        content,
        updateTime,
      };
    }
    default:
      return state;
  }
};

const articleList = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLE_QUERY_LOADING':
      return { isLoading: true };
    case 'ARTICLE_QUERY_SUCCESS':
      return { isLoading: false, ...action.payload };
    case 'ARTICLE_QUERY_FAILED':
      return { isLoading: false };
    default:
      return state;
  }
};

const reducer = combineReducers({
  userInfo,
  article,
  articleList,
});

export default reducer;
