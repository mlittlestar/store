import React from 'react';
import axios from '../axioss/http/index';
import $ from 'jquery';
import {Table,message,Modal, Button,Icon  } from 'antd';

import OrderForm from './OrderForm';

import moment from 'moment';

class Order extends React.Component{
    constructor(){
        super();
        this.state={
            orders:[],
            order:{},
            visible:false
            
        }
    }

    componentWillMount(){
        this.loadOrder();
    }

    loadOrder(){
        
        axios.get('/order/findAllWithUserOrRider')
        .then((result)=>{
        this.setState({
            orders:result.data
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
                axios.get('/order/deleteOrderById',{
                    params:{id}
                  }).then((result)=>{
                    this.loadOrder();
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
               
               var time=new Date(values.ordertime._d);
               console.log(time);
               console.log(values)
               let url ="http://127.0.0.1:8989/order/saveOrupdateOrder";
               
               $.post(url,{...values,ordertime:time},({status,message})=>{
               if(status === 200){
                   message.success(message)
                   this.setState({ visible: false, });
                   // 页面刷新
                   this.loadOrder();
                   console.log(values)
           } else {
                   message.error(message);
           }
        })
                // axios.post('/order/saveOrupdateOrder',{...values,ordertime:time})
                // .then(()=>{
                //         this.setState({ 
                //             visible: false, });
                //         this.loadOrder();
                //         alert(1111111)
                //     })
                //     .catch(function (error) {
                //         alert(error);
                // });
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
            order:{}
        })
    }


    toEdit(record){
        this.setState({
            visible:true,
            order:{...record,ordertime:null}
        })
    }


    OrderFormRefs=(form)=>{
        this.form=form;
    }

    

    render(){
        let {orders}=this.state;


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
                title:'订单时间',
                dataIndex:"ordertime",
                render: record => <span>{moment(record).format('YYYY-MM-DD HH:mm:ss')}</span>,
                // render:(record)=>{
                //    var time = new Date(+new Date(record)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
                //    console.log(time)
                // }
            },
            {
                title:'订单状态',
                dataIndex:"status"
            },
            {
                title:'用户姓名',
                dataIndex:"user.name"
            },
            {
                title:'骑手姓名',
                dataIndex:"rider.name"
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
                            <Icon type="eye"/>
                        </div>
                    )
                }
            }
        ]


        return(
            <div className="order">
                <div className="btn">
                    <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>
                </div>
                <Table rowSelection={rowSelection} columns={conlums} dataSource={this.state.orders} bordered="true"/>
                <Modal
                    title="添加订单"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <OrderForm initData={this.state.order} ref={this.OrderFormRefs}/>
                    
                </Modal>
            </div>

        )
    }
}




export default Order;