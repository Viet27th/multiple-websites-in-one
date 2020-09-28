import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
// https://medium.com/@officialrajdeepsingh/how-to-use-bootstrap-in-react-js-adf50165c7a1
import $ from "jquery"; // eslint-disable-line
import Popper from 'popper.js'; // eslint-disable-line
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
