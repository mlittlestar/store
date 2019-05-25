import React from 'react';
import $ from 'jquery';
import { Button,Table,Icon } from 'antd';


class Teacher extends React.Component{
    constructor(){
        super();
        this.state={
            teachers:[]
        }
        
    }

    componentWillMount(){
        this.loadTeacher();
    }

    loadTeacher(){
        let url="http://203.195.251.185:8282/student/findAllByType"
        $.get(url,({status,data,message})=>{
            if(status===200){
                this.setState({
                    teachers:data
                })
            }else{
                alert(message);
            }
        })
    }

    goBack(){
        this.props.history.goBack();
    }
    
    render(){
        
        let {teachers}=this.state;
        const columns=[
            {
                title: 'ID',
                dataIndex: 'id',
                render: text => <a href="javascript:;">{text}</a>
            },
            {
                title: '姓名',
                dataIndex: 'username',
            },
            {
                title: '类型',
                dataIndex: 'type',
            },
            {
                title: '状态',
                dataIndex: 'status',
            },
            {
                title: '操作',
                width:100,
                align:'center',
                render: (val,record) =>{
                    return(
                        <div>
                            <Icon type="delete" />&nbsp;
                            <Icon type="edit" />&nbsp;
                            <Icon type="eye"/>
                        </div>
                    )
                }
            }
            
        ]




        return(
            <div className="teacher">
                <h2>{this.props.location.state.username}</h2>
                {JSON.stringify(this.props.location.state)}
                <Button type="primary">添加</Button>
                <Button type="danger">批量删除</Button>
                <Button type="link" onClick={this.goBack.bind(this)}>返回</Button>

                <Table  columns={columns} dataSource={teachers}/>

            </div>
        )
    }
}




export default Teacher;