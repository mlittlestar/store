import React from 'react';
import {Form,Input} from 'antd';

class CategoryForm extends React.Component{
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
        getFieldDecorator("type");
        return(
            <div classtype="CategoryForm">
                <Form onSubmit={this.handleSubmit} classtype="login-form">
                    <Form.Item label="种类">
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: 'Please input your type!' }],
                        })(
                            <Input placeholder="type"/>,
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


export default Form.create({mapPropsToFields})(CategoryForm);