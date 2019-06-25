import React from 'react';
import logo from './logo.svg';
import './App.css';


import User from './bs/user/User';
import Role from './bs/role/Role';
import Rider from './bs/rider/Rider';
import Category from './bs/category/Category';
import Restaurant from './bs/restaurant/Restaurant';
import Foot from './bs/foot/Foot';
import OrderLine from './bs/orderline/OrderLine';
import Order from './bs/order/Order';
import First from './First';
import LoginForm from './bs/first/LoginForm';

import RestaurantDetails from './bs/restaurant/RestaurantDetails'

import {BrowserRouter,Route,Switch} from 'react-router-dom';

function App(){

  return (
    <div className="App">
      <First/>
         <BrowserRouter>
             <Switch>
                 {/* <Route path='/user' component={User}/>
                 <Route path='/role' component={Role}/>
                 <Route path='/category' component={Category}/>
                 <Route path='/restaurant' component={Restaurant}/>
                 <Route path='/foot' component={Foot}/>
                 <Route path='/order' component={Order}/>
                 <Route path='/orderLine' component={OrderLine}/>
                 <Route path='/rider' component={Rider}/> */}
                 {/* <Route exact path='/' component={LoginForm}/>  */}
                 <Route  path='/first' component={First}/>
                 {/* <Route  path='/orderline' component={OrderLine}/> */}
                 {/* <Route path='/userdtails' component={UserDetails}/> */}  
                 <Route path='/restaurantDetails' component={RestaurantDetails}/>  
             </Switch>
         </BrowserRouter>
    </div>
   );

}


  
    




export default App;
