import React from 'react';
import { render } from 'react-dom';
import Router from './router/index';
import { Provider } from 'react-redux';
import configureStore from './createStore';
import ErrorBoundary from './common/ErrorBoundary/index';
import 'antd/dist/antd.less';

const { store } = configureStore();
render(
  <ErrorBoundary>
    <Provider store={store}> 
      <Router />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);