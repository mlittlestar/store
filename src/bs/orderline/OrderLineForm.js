import React from 'react';
import $ from 'jquery';
import {Form,Input,Select  } from 'antd';

class OrderLineForm extends React.Component{
    constructor(){
        super();
        this.state={
            foots:[],
            orders:[]
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
        this.loadFoot();
        this.loadOrder();
    }


    loadFoot(){
        let url="http://127.0.0.1:8989/foot/findAllWithROrC"
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    foots:data
                })
            }else{
                alert(message);
            }
        })
    }

    loadOrder(){
        let url="http://127.0.0.1:8989/order/findAllWithUserOrRider"
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    orders:data
                })
            }else{
                alert(message);
            }
        })
    }


    render(){
        let {foots,orders}=this.state;

        const { getFieldDecorator } = this.props.form;
        getFieldDecorator("id");
        
        const Option = Select.Option;
        return (
            <div className="orderLineform">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    
                    <Form.Item label="订单数量">
                        {getFieldDecorator('num', {
                            rules: [{ required: true, message: 'Please input your num!' }],
                        })(
                            <Input placeholder="num"/>,
                        )}
                    </Form.Item>

                    <Form.Item label="订单">
                        {getFieldDecorator('orderId')
                        (
                          <Select defaultValue={orders.orderId} style={{ width: 120 }}  placeholder="Select">
                            {orders.map(orderExtend => (
                                <Option key={orderExtend.id}>{orderExtend.user.name}</Option>  
                            ))}
                          </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="菜品">
                        {getFieldDecorator('footId')
                        (
                          <Select defaultValue={foots.footId} style={{ width: 120 }}  placeholder="Select">
                            {foots.map(footExtend => (
                                <Option key={footExtend.id}>{footExtend.name}</Option>  
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

export default Form.create({mapPropsToFields})(OrderLineForm);