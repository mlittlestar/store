import React from 'react';
import {Form,Input} from 'antd';

class RiderForm extends React.Component{
    constructor(){
        super();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            }
        });
    }

    render(){

        const { getFieldDecorator } = this.props.form;
        getFieldDecorator("id");
        getFieldDecorator("name");
        getFieldDecorator("telephone");
        return(
            <div className="riderform">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('name')(
                            <Input placeholder="name"/>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('telephone')(
                            <Input placeholder="telephone"/>,
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


export default Form.create({mapPropsToFields})(RiderForm);