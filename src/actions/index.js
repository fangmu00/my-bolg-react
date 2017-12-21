import { message } from 'antd';
import Fetch from '../app/uilts/fetch';

Fetch.set({
  login: 'user/login',
  manageArticle: 'article/manageArticle',
});

export const login = params => (dispatch) => {
  dispatch({ type: 'LOGIN_LOADING' });
  Fetch.jsonp('login', params).then((content) => {
    if (content.isSuccess) {
      message.success(content.message);
      dispatch({ type: 'LOGIN_SUCCESS', payload: params });
    } else {
      dispatch({ type: 'LOGIN_FAILED' });
    }
  });
};

export const articleAddorEdit = params => (dispatch) => {
  dispatch({ type: 'ARTICLE_LOADING' });
  Fetch.jsonp('manageArticle', params).then((content) => {
    if (content.isSuccess) {
      message.success(content.message);
      dispatch({ type: 'ARTICLE_EDIT_SUCCESS', payload: { id: content.retValue.id, operationCode: params.operationCode } });
    } else {
      dispatch({ type: 'ARTICLE_EDIT_FAILED' });
    }
  });
};

export const creator = ({ type, payload = '' }) => ({
  type,
  payload,
});

const actions = [];

export default actions;
