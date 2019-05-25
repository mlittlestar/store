import React from 'react';
import $ from 'jquery';

class Category extends React.Component{
    constructor(){
        super();
        this.state={
            categorys:[],
            form:{
                type:""
            }
        }
    }

    componentWillMount(){
        this.loadCategory();
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


    //删除
    deleteHandler(id){
        this.deleteById(id,({status,message})=>{
            if(status===200){
                alert(message);
                this.loadCategory();
            }else{
                alert(message);
            }
        })

    }

    deleteById(id,handler){
        let url="http://127.0.0.1:8989/category/deleteCategoryById?id="+id;
        $.get(url,function(result){
            handler(result);
        });
    }


    updateCategoryById(id){

        $.get("http://127.0.0.1:8989/category/findCategoryById?id="+id,({status,message,data})=>{
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
        let url="http://127.0.0.1:8989/category/saveOrupdateCategory";
        $.post(url,this.state.form,({status,message})=>{
            alert(message);
            this.loadCategory();

        });
        event.preventDefault();
    }

    render(){
        let {categorys,form}=this.state;
        return(
            <div className="category">
                <h2>食物分类管理</h2>

                {JSON.stringify(form)}
                <form onSubmit={this.submitForm}>
                    用户名
                    <input type="text" name="type" value={this.type} onChange={this.MappingHandler}/>

                    <input type="submit" value="提交"/>
                </form>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>食物分类</th>
                            <th>操作</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            categorys.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td><input type="checkbox"/></td>
                                        <td>{item.type}</td>
                                        <td>
                                            <span onClick={this.deleteHandler.bind(this,item.id)}>删除</span>
                                            <span onClick={this.updateCategoryById.bind(this,item.id)}>修改</span>
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




export default Category;