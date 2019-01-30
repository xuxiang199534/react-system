// import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Model from './models';
import logger from 'redux-logger';
import { isDevEnvironment } from './utils/util';

const isDev = isDevEnvironment();
const sagaMiddleware = createSagaMiddleware();

let middleWares = [];
if (isDev) {
  middleWares = [
    sagaMiddleware,
    logger
  ]
} else {
  middleWares = [
    sagaMiddleware,
  ]
}
let store = createStore(Model.rootReducer, undefined, compose(
  applyMiddleware(...middleWares),
));

export default function configureStore() {
  // 运行saga
  sagaMiddleware.run(Model.rootSaga);
  return { store }
}