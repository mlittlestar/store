import React from 'react';
import $ from 'jquery';
import {Form,Input,Select} from 'antd';

class FootForm extends React.Component{
    constructor(){
        super();
        this.state={
            restaurants:[],
            categorys:[]
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
        this.loadRestaurant();
        this.loadCategory();
    }


    loadRestaurant(){
        let url="http://127.0.0.1:8989/restaurant/findAll";
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    restaurants:data
                })
            }else{
                alert(message);
            }
        })
    }

    loadCategory(){
        let url="http://127.0.0.1:8989/category/findAll";
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    categorys:data
                })
            }else{
                alert(message);
            }
        })

    }

    render(){
        let {restaurants,categorys}=this.state;
        const { getFieldDecorator } = this.props.form;
        getFieldDecorator("id");
        const Option = Select.Option;
        return(
            <div className="footform">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="菜名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your name!' }],
                        })(
                            <Input placeholder="name"/>,
                        )}
                    </Form.Item>

                    <Form.Item label="菜价钱">
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: 'Please input your price!' }],
                        })(
                            <Input placeholder="price"/>,
                        )}
                    </Form.Item>

                    <Form.Item label="商家">
                        {getFieldDecorator('restaurantId')
                        (
                          <Select defaultValue={restaurants.restaurantId} style={{ width: 120 }}  placeholder="Select">
                            {restaurants.map(restaurant => (
                                <Option key={restaurant.id}>{restaurant.name}</Option>  
                            ))}
                          </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="种类">
                        {getFieldDecorator('categoryId')
                        (
                          <Select defaultValue={categorys.categoryId} style={{ width: 120 }}  placeholder="Select">
                            {categorys.map(category => (
                                <Option key={category.id}>{category.type}</Option>  
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


export default Form.create({mapPropsToFields})(FootForm);