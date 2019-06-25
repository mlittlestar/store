import React from 'react';
import axios from '../axioss/http/index'
import { Table,Icon,Modal, Button,message } from 'antd';
import OrderLineForm from './OrderLineForm'

class OrderLine extends React.Component{
    constructor(){
        super();
        this.state={
            orderLines:[],
            orderLine:{},
            visible:false
            
        }
    }

    componentWillMount(){
        this.loadOrderLine();
        
    }

    loadOrderLine(){
        axios.get('/orderline/findAllWithManyTables')
        .then((result)=>{
        this.setState({
            orderLines:result.data
            })
        })
    }

    toDelete=(id)=>{
        Modal.confirm({
            title: '是否要删除',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:()=> {
                
                //进行删除
                axios.get('/orderline/deleteOrderLineById',{
                    params:{id}
                }).then((result)=>{
                    this.loadOrderLine();
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
               
                axios.post('/orderline/saveOrupdateOrderLine',values)
                        .then(()=>{
                            this.setState({ visible: false, });
                            this.loadOrderLine();
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
            orderLine:{}
        })
    }


    toEdit(record){
        console.log(record)
        this.setState({
            visible:true,
            orderLine:record
        })
    }

    OrderLineFormRefs=(form)=>{
        this.form=form
    }

    render(){
        let {orderLines,orderLine}=this.state;

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
                title:'下单数量',
                dataIndex:"num",
                // render: record => <span>{moment(record).format('YYYY-MM-DD HH:mm:ss')}</span>,
                
            },
            {
                title:'商家店铺',
                dataIndex:"footExtend.restaurant.name"
            },
            {
                title:'菜名',
                dataIndex:"footExtend.name"
            },
            {
                title:'菜价钱',
                dataIndex:"footExtend.price"
            },
            {
                title:'用户姓名',
                dataIndex:"orderExtend.user.name"
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
            <div className="orderLine">
                <div className="btn">
                    <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>
                    <Button type="primary" >结算</Button>
                </div>
                <Table rowSelection={rowSelection} columns={conlums} dataSource={this.state.orderLines} bordered="true"/>

                <Modal
                    title="添加订单链"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <OrderLineForm initData={this.state.orderLine} ref={this.OrderLineFormRefs}/>
                    
                </Modal>
            </div>
        )
    }
}




export default OrderLine;