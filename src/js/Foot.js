import React from 'react';
import $ from 'jquery';

class Foot extends React.Component{
    constructor(){
        super();
        this.state={
            categorys:[],
            restaurants:[],
            foots:[],
            form:{
                name:"",
                price:"",
                categoryId:"",
                restaurantId:""
            }
        }
    }

    componentWillMount(){
        this.loadFoot();
        this.loadCategory();
        this.loadRestaurant();
    }

    loadFoot(){
        let url="http://127.0.0.1:8989/foot/findAllWithROrC"
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    foots:data,
                    form:{...this.state.form,...{categoryId:data[0].id,restaurantId:data[0].id}}
                })
            }else{
                alert(message);
            }
        })
    }


    loadCategory(){
        let url="http://127.0.0.1:8989/category/findAll"
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
                this.loadFoot();
            }else{
                alert(message);
            }
        })

    }

    deleteById(id,handler){
        let url="http://127.0.0.1:8989/foot/deleteFootById?id="+id;
        $.get(url,function(result){
            handler(result);
        });
    }


    updateFootById(id){

        $.get("http://127.0.0.1:8989/foot/findFootById?id="+id,({status,message,data})=>{
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
        let url="http://127.0.0.1:8989/foot/saveOrupdateFoot";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadFoot();

        });
        event.preventDefault();
    }

    render(){
        let {foots,form,categorys,restaurants}=this.state;
        return(
            <div className="foot">
                <h2>食物管理</h2>

                {JSON.stringify(form)}
                <form onSubmit={this.submitForm}>
                    菜名
                    <input type="text" name="name" value={this.name} onChange={this.MappingHandler}/>
                    价钱
                    <input type="text" name="price" value={this.price} onChange={this.MappingHandler}/>
                    菜分类
                    <select name="categoryId" value={form.categoryId} onChange={this.MappingHandler}>
                        {
                            categorys.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.type}</option>
                            })
                        }
                    </select>

                    商家店名
                    <select name="restaurantId" value={form.restaurantId} onChange={this.MappingHandler}>
                        {
                            restaurants.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select>

                    <input type="submit" value="提交"/>
                </form>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>菜名</th>
                            <th>菜价钱</th>
                            <th>菜分类</th>
                            <th>商家店铺</th>
                            <th>商家地址</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            foots.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td><input type="checkbox"/></td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.category.type}</td>
                                        <td>{item.restaurant.name}</td>
                                        <td>{item.restaurant.address}</td>
                                        <td>
                                            <span onClick={this.deleteHandler.bind(this,item.id)}>删除</span>
                                            <span onClick={this.updateFootById.bind(this,item.id)}>修改</span>
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




export default Foot;