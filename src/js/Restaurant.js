import React from 'react';
import $ from 'jquery';

class Restaurant extends React.Component{
    constructor(){
        super();
        this.state={
            restaurants:[],
            form:{
                name:"",
                address:"",
                phone:""
                
            }
        }
    }

    componentWillMount(){
        this.loadRestaurant();
    }

    loadRestaurant(){
        let url="http://127.0.0.1:8989/restaurant/findAll"
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


    //删除
    deleteHandler(id){
        this.deleteById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadRestaurant();
            }else{
                alert(message);
            }
        })

    }

    deleteById(id,handler){
        let url="http://127.0.0.1:8989/restaurant/deleteRestaurantById?id="+id;
        $.get(url,function(result){
            handler(result);
        });
    }


    updateRestaurantById(id){

        $.get("http://127.0.0.1:8989/restaurant/findRestaurantById?id="+id,({status,message,data})=>{
            if(status===200){
                this.setState({
                    form:data
                })
                }else{
                    alert(message);
            }
    
        });
    
    }


    MappingHandler=(event)=>{
        let name=event.target.name;
        let val=event.target.value;
        this.setState({
            form:{...this.state.form,...{[name]:val}}
        })
    }

    submitForm=(event)=>{
        // 1. 获取表单数据,打印出来
        alert(JSON.stringify(this.state.form));
        //2.调用后台代码
        let url="http://127.0.0.1:8989/restaurant/saveOrupdateRestaurant";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadRestaurant();

        });
        event.preventDefault();
    }

    render(){
        let {restaurants,form}=this.state;
        return(
            <div className="restaurant">
                <h2>商家管理</h2>

                {JSON.stringify(form)}
                <form onSubmit={this.submitForm}>
                    商家店名
                    <input type="text" name="name" value={this.name} onChange={this.MappingHandler}/>
                    商家地址
                    <input type="text" name="address" value={this.address} onChange={this.MappingHandler}/>
                    商家电话
                    <input type="text" name="phone" value={this.phone} onChange={this.MappingHandler}/>
                    

                    <input type="submit" value="提交"/>
                </form>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>商家店名</th>
                            <th>商家地址</th>
                            <th>商家电话</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            restaurants.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td><input type="checkbox"/></td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <span onClick={this.deleteHandler.bind(this,item.id)}>删除</span>
                                            <span onClick={this.updateRestaurantById.bind(this,item.id)}>修改</span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}




export default Restaurant;