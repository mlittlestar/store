import React from 'react';
import $ from 'jquery';
import axios from '../axioss/http/index'
import { Button, Table,Icon, Modal,message } from 'antd';

import RiderForm from './RiderForm';

class Rider extends React.Component{
    constructor(){
        super();
        this.state={
            riders:[],
            rider:{},
            visible:false
        }

    }

    componentWillMount(){
        this.loadRider();
    }

    loadRider(){
        axios.get('/rider/findAll')
        .then((result)=>{
        this.setState({
            riders:result.data
            })
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
                axios.get('/rider/deleteRiderById',{
                    params:{id}
                  }).then((result)=>{
                    this.loadRider();
                    if(result){
                      message.success(result.statusText)
                    }
                  })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }


    //模态框的确认
    handleOk = e => {
        // 1. 获取表单数据
           e.preventDefault();
           this.form.validateFields((err, values) => {
           if (!err) {
               
            // alert(JSON.stringify(values))
            axios.post('/rider/saveOrupdateRider',values)
                .then(()=>{
                    this.setState({ visible: false, });
                    this.loadRider();
                })
                .catch(function (error) {
                    console.log(error);
            });
       }
    });
           // 2. 与后台交互完成保存或更新
           // 3. 关闭模态框，刷新页面
           // this.setState({ visible: false, });
   };
    //处理模态框的取消
    handleCancel = e => {
        this.setState({
          visible: false,
        });
    };




    toAdd(){
        this.setState({
            visible:true,
            rider:{}
        })
    }


    //点击编辑
    toEdit(record){
        this.setState({ 
            visible: true, 
            rider:record
        });
    }





    // ref函数
    RiderFormRefs = (form)=>{
        this.form = form;
    }


    render(){
        let{riders}=this.state;

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
                title:'姓名',
                dataIndex:"name"
            },
            {
                title:'电话',
                dataIndex:"telephone"
            },
            {
                title: '操作',
                width:100,
                align:'center',
                render: (val,record) =>{
                    return(
                        <div>
                            <Icon type="delete" onClick={this.toDelete.bind(this,record.id)}/>&nbsp;
                            <Icon type="edit" onClick={this.toEdit.bind(this,record)}/>&nbsp;
                            <Icon type="eye" />
                        </div>
                    )
                }
            }
        ]
        return(
            <div className="rider">
                <div className="btn">
                    <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>
                    <Button type="danger">批量删除</Button>
                </div>

                <Table rowSelection={rowSelection} columns={conlums} dataSource={this.state.riders} bordered="true"/>

                <Modal
                    title="添加骑手"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    
                    <RiderForm initData={this.state.rider} ref={this.RiderFormRefs}/>
                </Modal>
            </div>
        )
    }
}

export default Rider;