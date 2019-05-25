import React from 'react';
import $ from 'jquery';

class OrderLine extends React.Component{
    constructor(){
        super();
        this.state={
            foots:[],
            orders:[],
            orderlines:[],
            form:{
                num:"",
                footId:"",
                orderId:""
            }
        }
    }

    componentWillMount(){
        this.loadOrderLine();
        this.loadFoot();
        this.loadOrder();
    }

    loadOrderLine(){
        let url="http://127.0.0.1:8989/orderline/findAllWithManyTables"
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    orderlines:data,
                    form:{...this.state.form,...{categoryId:data[0].id,restaurantId:data[0].id}}
                })
            }else{
                alert(message);
            }
        })
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





    //删除
    deleteHandler(id){
        this.deleteById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadOrderLine();
            }else{
                alert(message);
            }
        })

    }

    deleteById(id,handler){
        let url="http://127.0.0.1:8989/orderline/deleteOrderLineById?id="+id;
        $.get(url,function(result){
            handler(result);
        });
    }


    updateOrderLineById(id){

        $.get("http://127.0.0.1:8989/orderline/findOrderLineById?id="+id,({status,message,data})=>{
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
        let url="http://127.0.0.1:8989/orderline/saveOrupdateOrderLine";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadOrderLine();

        });
        event.preventDefault();
    }

    render(){
        let {foots,form,orders,orderlines}=this.state;
        return(
            <div className="orderLine">
                <h2>下单链管理</h2>

                {JSON.stringify(form)}
                <form onSubmit={this.submitForm}>
                    订单数量
                    <input type="text" name="num" value={this.num} onChange={this.MappingHandler}/>
                    菜名
                    <select name="footId" value={form.footId} onChange={this.MappingHandler}>
                        {
                            foots.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>

                    订单编号
                    <select name="orderId" value={form.orderId} onChange={this.MappingHandler}>
                        {
                            orders.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.id}</option>
                            })
                        }
                    </select>

                    <input type="submit" value="提交"/>
                </form>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>下单数量</th>
                            <th>商家店铺</th>
                            <th>菜名</th>
                            <th>菜价钱</th>                            
                            <th>订单时间</th>
                            <th>骑手姓名</th>
                            <th>用户姓名</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orderlines.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td><input type="checkbox"/></td>
                                        <td>{item.num}</td>
                                        <td>{item.footExtend.restaurant.name}</td>
                                        <td>{item.footExtend.name}</td>
                                        <td>{item.footExtend.price}</td>
                                        <td>{item.orderExtend.ordertime}</td>
                                        <td>{item.orderExtend.rider.name}</td>
                                        <td>{item.orderExtend.user.name}</td>
                                        <td>
                                            <span onClick={this.deleteHandler.bind(this,item.id)}>删除</span>
                                            <span onClick={this.updateOrderLineById.bind(this,item.id)}>修改</span>
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




export default OrderLine;