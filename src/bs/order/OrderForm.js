import React from 'react';
import $ from 'jquery';
import {Form,Input,Select,DatePicker,TimePicker,Radio} from 'antd';

import moment from 'moment';

class OrderForm extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
            riders:[]
        }
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


    componentWillMount(){
        this.loadRider();
        this.loadUser();
    }


    loadUser(){
        let url="http://127.0.0.1:8989/user/findAll"
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    users:data
                })
            }else{
                alert(message);
            }
        })
    }

    loadRider(){
        let url="http://127.0.0.1:8989/rider/findAll"
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    riders:data
                })
            }else{
                alert(message);
            }
        })
    }

    render(){
        let {users,riders}=this.state;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          };
        const { getFieldDecorator } = this.props.form;
        getFieldDecorator("id");
        
        const Option = Select.Option;
        return(
            <div className="OrderForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="订单时间">
                        {getFieldDecorator('ordertime',config)(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" defaultValue={moment(null)}/>
                        )}
                    </Form.Item>

                    <Form.Item label="订单状态">
                        {getFieldDecorator('status', {
                           initialValue: '已支付',
                        })(
                            <Radio.Group>
                            <Radio value="已支付">已支付</Radio>
                            <Radio value="未支付">未支付</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item label="用户姓名">
                        {getFieldDecorator('userId')
                        (
                          <Select defaultValue={users.userId} style={{ width: 120 }}  placeholder="Select">
                            {users.map(user => (
                                <Option key={user.id}>{user.name}</Option>  
                            ))}
                          </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="骑手姓名">
                        {getFieldDecorator('riderId')
                        (
                          <Select defaultValue={riders.riderId} style={{ width: 120 }}  placeholder="Select">
                            {riders.map(rider => (
                                <Option key={rider.id}>{rider.name}</Option>  
                            ))}
                          </Select>
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props)=>{
    let obj = {};
    for(let key in props.initData){
      let val = props.initData[key];
      obj[key] = Form.createFormField({value:val})
    }
    return obj;
}


export default Form.create({mapPropsToFields})(OrderForm);