import React from 'react';
import $ from 'jquery';

class User extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
            form:{
                name:"",
                telephone:"",
                address:""
            }
        }
    }

    componentWillMount(){
        this.loadUser();
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


    //删除
    deleteHandler(id){
        this.deleteById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadUser();
            }else{
                alert(message);
            }
        })

    }

    deleteById(id,handler){
        let url="http://127.0.0.1:8989/user/deleteUserById?id="+id;
        $.get(url,function(result){
            handler(result);
        });
    }


    updateUserById(id){

        $.get("http://127.0.0.1:8989/user/findUserById?id="+id,({status,message,data})=>{
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
        let url="http://127.0.0.1:8989/user/saveOrupdateUser";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadUser();

        });
        event.preventDefault();
    }

    render(){
        let{users,form}=this.state;
        return(
            <div className="user">
                <h2>用户管理</h2>

                {JSON.stringify(form)}
                <form onSubmit={this.submitForm}>
                    用户名
                    <input type="text" name="name" value={this.name} onChange={this.MappingHandler}/>
                    电话
                    <input type="text" name="telephone" value={this.telephone} onChange={this.MappingHandler}/>
                    地址
                    <input type="text" name="address" value={this.address} onChange={this.MappingHandler}/>

                    <input type="submit" value="提交"/>
                </form>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>用户名</th>
                            <th>电话</th>
                            <th>地址</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td><input type="checkbox"/></td>
                                        <td>{item.name}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <span onClick={this.deleteHandler.bind(this,item.id)}>删除</span>
                                            <span onClick={this.updateUserById.bind(this,item.id)}>修改</span>
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

export default User;