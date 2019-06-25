import React from 'react';
import { Button,Form,Input,Icon } from 'antd';
import $ from 'jquery';
import './LoginForm.css'
import App from '../../App'

import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';




class LoginForm extends React.Component{
    constructor(props){
        super(props);        
    }

    //校验
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };

    //登录
    HandleLogin=(event)=>{
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            
          if (!err) {
            let url="http://127.0.0.1:8989/role/login"

            $.post(url,values,({status,data})=>{
                    // console.log(data)
                    if(status===200){ 
                        window.localStorage.setItem("name",data.name)
                        window.location.href = "/App"

                    }else{
                        alert("用户名或密码不正确")
                    }
                })
          }
        });
    
    // HandleResigter=(event)=>{
    //     event.preventDefault();
    // }


        // let url="http://127.0.0.1:8989/role/login"
        // $.post(url,({data,status,message})=>{
        //     console.log(data)
        //     if(status===200){
        //         this.setState({
        //             role:data
        //         })
        //         this.props.history.push({
        //             pathname:'/App',
        //             state:this.state.form,
        //          });
        //     }
        // })
    }

    render(){
        
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                <Form onSubmit={this.handleSubmit} className="loginform">
                    <Form.Item label="用户名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="name"/>,
                        )}
                    </Form.Item>

                    <Form.Item label="密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }],
                    
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="password"/>,
                        )}
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" className=" btn1" onClick={this.HandleLogin}>登录</Button>
                        <Button type="link" className=" btn2" onClick={this.HandleResigter}>注册</Button>
                    </Form.Item>

                </Form>

                <BrowserRouter>
             <Switch>
                 
                 <Route  path='/app' component={App}/> 
                 {/* <Route path='/restaurantDetails' component={RestaurantDetails}/>   */}
             </Switch>
         </BrowserRouter>
               
            </div>
        )
    }
}


export default Form.create()(LoginForm);