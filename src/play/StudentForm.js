import React from 'react';
import $ from 'jquery';
import { Input,Form,Radio } from 'antd';


class StudentForm extends React.Component{
    constructor(){
        super();
        this.state={
            
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


    

   
    
    render(){
        const { getFieldDecorator } = this.props.form;
        getFieldDecorator("id");
        getFieldDecorator("username");
        getFieldDecorator("status");
        getFieldDecorator("type");
        getFieldDecorator("password");
        getFieldDecorator("gender");
        return(
            <div className="studentForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="姓名">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input placeholder="username"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="状态">
                        {getFieldDecorator('status', {
                            rules: [{ required: true, message: 'Please input your status!' }],
                        })(
                            <Input placeholder="status"/>,
                        )}
                    </Form.Item>
                    <Form.Item label="分类">
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: 'Please input your type!' }],
                        })(
                            <Input placeholder="type"/>,
                        )}
                    </Form.Item>
                    
                    <Form.Item label="性别" className="collection-create-form_last-form-item">
                        {getFieldDecorator('gender', {
                            initialValue: '男',
                        })(
                            <Radio.Group>
                            <Radio value="男">男</Radio>
                            <Radio value="女">女</Radio>
                            </Radio.Group>,
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


export default Form.create({mapPropsToFields})(StudentForm);