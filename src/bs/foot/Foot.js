import React from 'react';
import $ from 'jquery';
import { Button, Table,Icon } from 'antd';

class Foot extends React.Component{
    constructor(){
        super();
        this.state={
            foots:[],
            foot:{}
            
        }
    }

    componentWillMount(){
        this.loadFoot();
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


    render(){
        let {foots,foot}=this.state;

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
                title:'菜名',
                dataIndex:"name"
            },
            {
                title:'电菜价钱话',
                dataIndex:"price"
            },
            {
                title:'菜分类',
                dataIndex:"category.type"
            },
            {
                title:'商家店铺',
                dataIndex:"restaurant.name"
            },
            {
                title:'商家地址',
                dataIndex:"restaurant.address"
            },
            {
                title: '操作',
                width:100,
                align:'center',
                render: (val,record) =>{
                    return(
                        <div>
                            <Icon type="delete"/>&nbsp;
                            <Icon type="edit"/>&nbsp;
                            <Icon type="eye"/>
                        </div>
                    )
                }
            }
        ]
        return(
            <div className="foot">
                <div className="btn">
                    <Button type="primary">添加</Button>
                </div>
                <Table rowSelection={rowSelection} columns={conlums} dataSource={this.state.foots} bordered="true"/>
            </div>
        )
    }
}




export default Foot;