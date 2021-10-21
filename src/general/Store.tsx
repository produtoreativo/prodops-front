import React from 'react';

import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware, { Task, Saga } from 'redux-saga';
import createReducer from './redux/RootReducer';

export const browserHistory = createBrowserHistory();

export interface StoreApp extends Store {
  runSaga<S extends Saga>(saga: S, ...args: Parameters<S>): Task,
}

function configureAppStore(): StoreApp {

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(browserHistory), sagaMiddleware];
  const composeEnhancers = composeWithDevTools({});
  const composed = composeEnhancers(applyMiddleware(...middlewares));
  const reducer = createReducer(browserHistory)
  const store = createStore(reducer, composed);

  return {
    ...store,
    runSaga: sagaMiddleware.run,
  };

}

declare interface StoreProps {
  children: React.ReactNode;
}

export default function StoreJS(props:StoreProps) {
  return (
    <Provider store={configureAppStore()}>
      { props.children }
    </Provider>
  )
}