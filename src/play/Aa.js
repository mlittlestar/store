import React from 'react';
import './Aa.css';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import {Button} from 'antd'
import Student from './Student';
import Teacher from './Teacher';


  function Aa(){
    return (
      <div className="Aa">
        <header className='header'>
           <h1>学生系统</h1>
         </header>
         <article className="content">
           <BrowserRouter>
               <ul className="nav">
               <li><Link to='/student'>学生管理</Link></li>
               <li><Link to='/teacher'>老师管理</Link></li>
               
               </ul>
   
               <div className="content-right">
               <Switch>
                   <Route path='/student' component={Student}/>
                   <Route path='/teacher' component={Teacher}/> 
                   
               </Switch>
               </div>
  
           </BrowserRouter>
         </article>
      </div>
     );
  }


export default Aa;
