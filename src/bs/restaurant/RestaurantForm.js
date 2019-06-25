import React from 'react';
import {Form,Input} from 'antd';

class RestaurantForm extends React.Component{
    constructor(){
        super();
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

    render(){
        const { getFieldDecorator } = this.props.form;
        getFieldDecorator("id");
        getFieldDecorator("name");
        getFieldDecorator("address");
        getFieldDecorator("phone");
        return(
            <div classtype="RestaurantForm">
                <Form onSubmit={this.handleSubmit} classtype="login-form">
                    <Form.Item label="饭店">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input placeholder="name"/>,
                        )}
                    </Form.Item>

                    <Form.Item label="饭店地址">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please input your address!' }],
                        })(
                            <Input placeholder="address"/>,
                        )}
                    </Form.Item>

                    <Form.Item label="饭店电话">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone!' }],
                        })(
                            <Input placeholder="phone"/>,
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


export default Form.create({mapPropsToFields})(RestaurantForm);