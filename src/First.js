import React from 'react';
import logo from './logo.svg';
import './First.css';


import User from './bs/user/User';
import Role from './bs/role/Role';
import Rider from './bs/rider/Rider';
import Category from './bs/category/Category';
import Restaurant from './bs/restaurant/Restaurant';
import Foot from './bs/foot/Foot';
import OrderLine from './bs/orderline/OrderLine';
import Order from './bs/order/Order';
import RestaurantDetails from './bs/restaurant/RestaurantDetails';

import { createHashHistory,createBrowserHistory } from 'history';


import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import {Icon,Menu} from 'antd'
class First extends React.Component{
  constructor(){
    super();
  }

  Handlejump=()=>{
      // event.preventDefalut();
      createHashHistory().push('/category')
  }


  render(){
    const { SubMenu }  = Menu;
    var history = createHashHistory();

    return (
      <div className="First">
        
         <article className="content">

           <BrowserRouter>
               <ul className="nav">

                <header className='header'>
                  <h2>外卖订单系统</h2>
                </header>
                 <Menu
                  mode="inline"
                  // theme="null"
                  style={{color:"teal"}}
                 >
                   <SubMenu
                      key="sub1"
                      theme="teal"
                      title={
                        <span>
                          <Icon type="setting" />
                          <span>系统管理</span>
                        </span>
                      }

                    >
                      <Menu.Item key="1"><li><Link to='/user'>用户管理</Link></li></Menu.Item>
                      <Menu.Item key="2"><li><Link to='/role'>管理者管理</Link></li></Menu.Item>
                      <Menu.Item key="3"><li><Link to='/rider'>骑手管理</Link></li></Menu.Item>
                    </SubMenu>

                    <SubMenu
                      key="sub2"
                      theme="teal"
                      title={
                        <span>
                          <Icon type="star"  twoToneColor="teal" />
                          <span>餐饮信息管理</span>
                        </span>
                      }

                    >
                      <Menu.Item key="3"><li onClick={this.Handlejump}>食物分类管理</li></Menu.Item>
                      <Menu.Item key="4"><li><Link to='/foot'>食物管理</Link></li></Menu.Item>
                      <Menu.Item key="5"><li><Link to='/restaurant'>商家管理</Link></li></Menu.Item>
                    </SubMenu>

                      
                      <Menu.Item key="6"><li><Link to='/order'>订单管理</Link></li></Menu.Item>
                      <Menu.Item key="7"><li><Link to='/orderLine'>购物车</Link></li></Menu.Item>
                 </Menu>
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
                   <Route path='/rider' component={Rider}/>
                  


                   <Route path='/restaurantDetails' component={RestaurantDetails}/>
                   
                   
               </Switch>
               </div>
  
           </BrowserRouter>
         </article>
      </div>
     );
  }
}


export default First;
