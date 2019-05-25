import React from 'react';
import logo from './logo.svg';
import './App.css';
import User from './js/User';
import Role from './js/Role';
import Category from './js/Category';
import Restaurant from './js/Restaurant';
import Foot from './js/Foot';
import OrderLine from './js/OrderLine';
import Order from './js/Order';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import {Button} from 'antd'
class App extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <div className="App">
        <header className='header'>
           <h1>外卖订单系统</h1>
         </header>
         <article className="content">
           {/* <Button type="link" onClick={() => { window.location.href = "./User"}}>跳转</Button> */}
           <BrowserRouter>
               <ul className="nav">
               <li><Link to='/user'>用户管理</Link></li>
               <li><Link to='/role'>角色管理</Link></li>
               <li><Link to='/category'>食物分类管理</Link></li>
               <li><Link to='/restaurant'>商家管理</Link></li>
               <li><Link to='/foot'>食物管理</Link></li>
               <li><Link to='/order'>订单管理</Link></li>
               <li><Link to='/orderLine'>下单链管理</Link></li>
               
               </ul>
   
               <div className="content-right">
               <Switch>
                   <Route path='/user' component={User}/>
                   <Route path='/role' component={Role}/>
                   <Route path='/category' component={Category}/>
                   <Route path='/restaurant' component={Restaurant}/>
                   <Route path='/foot' component={Foot}/>
                   <Route path='/order' component={Order}/>
                   <Route path='/orderLine' component={OrderLine}/>
                   
                   
               </Switch>
               </div>
  
           </BrowserRouter>
         </article>
      </div>
     );
  }
}


export default App;
