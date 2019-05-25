import React from 'react';
import {Button} from 'antd';
import App from '../App';
class Home extends React.Component{
  constructor(){
    super();
  }

  render(){
    return (
      <div className="home">
           <Button type="link" onClick={() => { window.location.href = "./App"}}>跳转</Button>
           
      </div>
     );
  }
}


export default Home;
