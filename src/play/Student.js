import React from 'react';
import $ from 'jquery';
import { Button,Table,Icon,Modal,message} from 'antd';

import StudentForm from './StudentForm';


class Student extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            ids:[],
            visible:false,
            student:{},
            
        }
        
    }

    componentWillMount(){
        this.loadUser();
    }

    loadUser(){
        let url="http://203.195.251.185:8282/student/findAll"
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

    
    //查看详细信息
    jump(record){
        this.props.history.push({
            pathname:'/Teacher',
            state:record,
          });
    }
    


    // 批量删除
    batchDelete(){
        Modal.confirm({
        title: '确认删除吗？',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk:()=> {
            // 编写代码进行删除
            let url = "http://203.195.251.185:8282/student/batchDelete";
            $.ajax({
            url,
            method:"POST",
            data:JSON.stringify(this.state.ids),
            contentType:"application/json",
            success:({status,message:msg})=>{
                if(status === 200){
                message.success(msg);
                this.loadUser();
                } else {
                message.error(msg)
                }
            }
            })
        },
        onCancel() {
            console.log('Cancel');
        },
        });

    }





    // 通过id删除
    toDelete =(id)=> {
        Modal.confirm({
        title: '确认删除吗？',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk:()=> {
            // 编写代码进行删除
            $.get("http://203.195.251.185:8282/student/deleteStudentById?id="+id,({status,message,data})=>{
                if(status===200){
                    this.loadUser();
                }
                alert(message);
            })

        },
        onCancel() {
            console.log('Cancel');
        },
        });
    }


    // 点击添加按钮的执行函数
    toAdd(){
        this.setState({ 
        visible: true, 
        student:{}
        });
    }

    // 点击修改按钮的执行函数
    toEdit(record){
        this.setState({ 
        visible: true, 
        student:record
        });
    }

    handleOk = e => {
         // 1. 获取表单数据
            e.preventDefault();
            this.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let url ="http://203.195.251.185:8282/student/saveStudent";
                $.post(url,values,({status,message})=>{
                if(status === 200){
                    message.success(message)
                    this.setState({ visible: false, });
                    // 页面刷新
                    this.loadUser();
            } else {
                    message.error(message);
            }
         })
        }
     });
            // 2. 与后台交互完成保存或更新
            // 3. 关闭模态框，刷新页面
            // this.setState({ visible: false, });
    };

     // 点击了模态框的取消按钮
    handleCancel = e => {
        this.setState({ visible: false, });
    };



    // ref函数
    studentFormRefs = (form)=>{
        this.form = form;
    }
    
    render(){
        let {users}=this.state;


        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({ids:selectedRowKeys})
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };



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
                title: '性别',
                dataIndex: 'gender',
            },
            {
                title: '操作',
                width:100,
                align:'center',
                render: (val,record) =>{
                    return(
                        <div>
                            <Icon type="delete" onClick={this.toDelete.bind(this,record.id)}/>&nbsp;
                            <Icon type="edit"  onClick={this.toEdit.bind(this,record)}/>&nbsp;
                            <Icon type="eye" onClick={this.jump.bind(this,record)}/>
                        </div>
                    )
                }
            }
            
        ]


       
        return(
            <div className="sc">
                <h2></h2>
                {/* 按钮 */}
                <div className="btn">
                    <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>&nbsp;
                    <Button type="danger" onClick={this.batchDelete.bind(this)}>批量删除</Button>
                </div>
                {/* 表格 */}
                <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={this.state.users} bordered="true"/>


                 {/* 模态框 */}
                <Modal
                    title="添加学生"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                     <StudentForm initData={this.state.student} ref={this.studentFormRefs}/>
                </Modal>
            </div>
        )
    }
}




export default Student;