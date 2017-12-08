import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';// AppContainer 是一个 HMR 必须的包裹(wrapper)组件
import Index from '../components/Index';
import store from '../store';

import './app.less';

/* global document */

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('App'),
  );
};

render(Index);

// 模块热替换的 API
if (module.hot) {
  module.hot.accept('../components/View', () => {
    render(Index);
  });
}
