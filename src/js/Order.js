import React from 'react';
import $ from 'jquery';
import { DatePicker,Table,Search,Input  } from 'antd';

class Order extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
            riders:[],
            orders:[],
            form:{
                ordertime:"",
                status:"",
                userId:"",
                riderId:""
            }
        }
    }

    componentWillMount(){
        this.loadOrder();
        this.loadUser();
        this.loadRider();
    }

    loadOrder(){
        let url="http://127.0.0.1:8989/order/findAllWithUserOrRider"
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    orders:data,
                    form:{...this.state.form,...{userId:data[0].id,riderId:data[0].id}}
                })
            }else{
                alert(message);
            }
        })
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





    //删除
    deleteHandler(id){
        this.deleteById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadOrder();
            }else{
                alert(message);
            }
        })

    }

    deleteById(id,handler){
        let url="http://127.0.0.1:8989/order/deleteOrderById?id="+id;
        $.get(url,function(result){
            handler(result);
        });
    }


    updateOrderById(id){

        $.get("http://127.0.0.1:8989/order/findOrderById?id="+id,({status,message,data})=>{
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
        let url="http://127.0.0.1:8989/order/saveOrupdateOrder";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadOrder();

        });
        event.preventDefault();
    }

    render(){
        let {orders,form,users,riders}=this.state;
        // const columns=[
        //     {
        //         title: 'ID',
        //         dataIndex: 'id',
        //     },
        //     {
        //         title: '订单时间',
        //         dataIndex: 'ordertime',
        //     },
        //     {
        //         title: '订单状态',
        //         dataIndex: 'status',
        //     }
        // ]
        const Search = Input.Search;
        return(
            <div className="order">
                <h2>订单管理</h2>

                {JSON.stringify(form)}
                <form onSubmit={this.submitForm}>
                    订单时间
                    <DatePicker type="text" name="ordertime" value={this.ordertime} onChange={this.MappingHandler}/>
                    订单状态
                    <input type="text" name="status" value={this.status} onChange={this.MappingHandler}/>
                    用户姓名
                    <select name="userId" value={form.userId} onChange={this.MappingHandler}>
                        {
                            users.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>

                    商家店名
                    <select name="riderId" value={form.riderId} onChange={this.MappingHandler}>
                        {
                            riders.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>

                    <Search type="submit" value="提交"/>
                </form>
                
                {/* <Table columns={columns} dataSource={orders} bordered="ture"/> */}
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>订单时间</th>
                            <th>订单状态</th>
                            <th>用户姓名</th>
                            <th>骑手姓名</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td><input type="checkbox"/></td>
                                        <td>{item.ordertime}</td>
                                        <td>{item.status}</td>
                                        <td>{item.user.name}</td>
                                        <td>{item.rider.name}</td>
                                        <td>
                                            <span onClick={this.deleteHandler.bind(this,item.id)}>删除</span>
                                            <span onClick={this.updateOrderById.bind(this,item.id)}>修改</span>
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




export default Order;