import React from 'react';

import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from './redux/RootReducer';

export const browserHistory = createBrowserHistory();

function configureAppStore() {

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

export default function Store(props:StoreProps) {
  return (
    <Provider store={configureAppStore()}>
      { props.children }
    </Provider>
  )
}