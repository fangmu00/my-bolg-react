import { message } from 'antd';
import Fetch from '../app/uilts/fetch';

Fetch.set({
  login: 'user/login',
  manageArticle: 'article/manageArticle',
  queryArticle: 'article/queryArticle',
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

export const articleAddorEdit = (params, history) => (dispatch) => {
  dispatch({ type: 'ARTICLE_LOADING' });
  Fetch.jsonp('manageArticle', params).then((content) => {
    if (content.isSuccess) {
      message.success(content.message);
      const { operationCode } = params;
      if (operationCode === 'add') {
        history.push('/ArticleList');
      }
      dispatch({ type: 'ARTICLE_EDIT_SUCCESS', payload: { id: content.retValue.id } });
    } else {
      dispatch({ type: 'ARTICLE_EDIT_FAILED' });
    }
  });
};

export const articleQuery = (params, isFirst) => (dispatch) => {
  dispatch({ type: 'ARTICLE_QUERY_LOADING' });
  Fetch.jsonp('queryArticle', params).then((content) => {
    if (content.isSuccess) {
      if (!isFirst) {
        message.success(content.message);
      }
      dispatch({ type: 'ARTICLE_QUERY_SUCCESS', payload: { ...content.retValue, queryVo: params.queryVo } });
    } else {
      dispatch({ type: 'ARTICLE_QUERY_FAILED' });
    }
  });
};

export const creator = ({ type, payload = '' }) => ({
  type,
  payload,
});

export const creatorAsync = ({ type, params }) => (dispatch) => {
  dispatch({ type: 'GLOBAL_LOADING' });
  Fetch.jsonp('queryArticle', params).then((content) => {
    if (content.isSuccess) {
      message.success(content.message);
      dispatch({ type: `${type}_SUCCESS`, payload: { content: content.retValue } });
    } else {
      dispatch({ type: `${type}_FAILED` });
    }
  });
};
const actions = [];

export default actions;
