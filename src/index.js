import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import App from './containers/AppContainer';
import reducers, { initialState } from './reducers';
import 'typeface-roboto';

const store = createStore(reducers, initialState, applyMiddleware(thunk));
const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

render();
// store.subscribe(render)
