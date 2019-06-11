import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import './Firstpage.css';
import Home from './Home';
import App from '../App';
import User from '../bs/user/User';
import Role from '../bs/role/Role';
import Rider from '../bs/rider/Rider';
import Category from '../bs/category/Category';
import Foot from '../bs/foot/Foot';

import UserDetails from './user/UserDetails';
function Firstpage(){
    return (
        <div className="firstpage">
            <BrowserRouter>
                <Route exact path='/' component={Home}/>
                <Route path='/app' component={App}/>
                <Route path='/user' component={User}/>
                <Route path='/role' component={Role}/>
                <Route path='/rider' component={Rider}/>
                <Route path='/category' component={Category}/>
                <Route path='/foot' component={Foot}/>
                
                <Route path='/userdtails' component={UserDetails}/>
            </BrowserRouter>
        </div>
    )
}

export default Firstpage;