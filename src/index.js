import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Aa from './js/Aa';
import App from './App';
import Firstpage from './bs/Firstpage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Firstpage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
