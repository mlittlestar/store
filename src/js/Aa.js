import React from 'react';
import { Button} from 'antd';
import {BrowserRouter,Route} from 'react-router-dom';
import App from '../App';
import User from './User';
import Home from './Home';
import Role from './Role';
import Category from './Category';
import Restaurant from './Restaurant';
import Foot from './Foot';
import OrderLine from './OrderLine';
import Order from './Order';
import './Aa.css';


function Aa(){
    
    return(

        
        
            <div className="aa">
            {/* <Button type="link" onClick={() => { window.location.href = "./App"}}>跳转</Button> */}
            {/* <Button type="primary" onClick={() => { window.open ('./user')}}>跳转1</Button> */}
            
            <BrowserRouter>
                {/* <Route exact path='/' component={App}/> */}
                <Route exact path='/' component={Home}/>
                <Route path='/user' component={User}/>
                <Route path='/app' component={App}/>
            </BrowserRouter>
            </div>
            
            
        
    )
    
}




export default Aa;