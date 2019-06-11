import React from 'react';
import logo from './logo.svg';
import './App.css';


import User from './bs/user/User';
import Role from './bs/role/Role';
import Rider from './bs/rider/Rider';
import Category from './bs/category/Category';
import Restaurant from './js/Restaurant';
import Foot from './bs/foot/Foot';
import OrderLine from './js/OrderLine';
import Order from './js/Order';
import UserDetails from './bs/user/UserDetails';


import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import {Icon,Menu} from 'antd'
class App extends React.Component{
  constructor(){
    super();
  }


  render(){
    const { SubMenu }  = Menu;
    return (
      <div className="App">
        <header className='header'>
           <h1>外卖订单系统</h1>
         </header>
         <article className="content">
           <BrowserRouter>
               <ul className="nav">
                 <Menu
                  mode="inline"
                  theme="teal"
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
                      <Menu.Item key="2"><li><Link to='/role'>角色管理</Link></li></Menu.Item>
                    </SubMenu>

                    <SubMenu
                      key="sub2"
                      theme="teal"
                      title={
                        <span>
                          <Icon type="star"  twoToneColor="teal" />
                          <span>食物管理</span>
                        </span>
                      }

                    >
                      <Menu.Item key="3"><li><Link to='/category'>食物分类管理</Link></li></Menu.Item>
                      <Menu.Item key="4"><li><Link to='/foot'>食物管理</Link></li></Menu.Item>
                    </SubMenu>

                      <Menu.Item key="5"><li><Link to='/restaurant'>商家管理</Link></li></Menu.Item>
                      <Menu.Item key="6"><li><Link to='/order'>订单管理</Link></li></Menu.Item>
                      <Menu.Item key="7"><li><Link to='/orderLine'>下单链管理</Link></li></Menu.Item>
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
                  


                   <Route path='/userdtails' component={UserDetails}/>
                   
                   
               </Switch>
               </div>
  
           </BrowserRouter>
         </article>
      </div>
     );
  }
}


export default App;
