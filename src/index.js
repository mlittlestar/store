import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Aa from './play/Aa';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Aa />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
