import React from 'react';
import $ from 'jquery';
import { Button, Table,Icon,Modal } from 'antd';

class Category extends React.Component{
    constructor(){
        super();
        this.state={
            categorys:[],
            category:{}
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

    //通过id删除
    toDelete=(id)=>{
        Modal.confirm({
            title: '是否要删除',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:()=> {
                //进行删除
                $.get("http://127.0.0.1:8989/category/deleteCategoryById?id="+id,({status,message})=>{
                    if(status===200){
                        this.loadCategory();
                    }else{
                        alert(message);
                    }
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    

   
    render(){
        let {categorys,category}=this.state;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(selectedRowKeys,selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };

        const conlums=[
            {
                title:'ID',
                dataIndex:"id"
            },
            {
                title:'种类',
                dataIndex:"type"
            },
            {
                title: '操作',
                width:100,
                align:'center',
                render: (val,record) =>{
                    return(
                        <div>
                            <Icon type="delete" onClick={this.toDelete.bind(this,record.id)}/>&nbsp;
                            <Icon type="edit"/>&nbsp;
                            <Icon type="eye"/>
                        </div>
                    )
                }
            }
        ]
        return(
            <div className="category">
                <div className="btn">
                <Button type="primary">添加</Button>
                </div>

                <Table rowSelection={rowSelection} columns={conlums} dataSource={this.state.categorys} bordered="true"/>
                

                
            </div>
        )
    }
}




export default Category;