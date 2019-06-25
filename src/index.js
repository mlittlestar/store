import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Aa from './js/Aa';
import App from './App';
import LoginForm from './bs/first/LoginForm'
import * as serviceWorker from './serviceWorker';

var show=<LoginForm/>
var a=window.localStorage.getItem("name")

if(a){
    show=<App/>
}else{
    show=<LoginForm/>
}

ReactDOM.render(show, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
