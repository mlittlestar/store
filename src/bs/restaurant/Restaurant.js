import React from 'react';
import axios from '../axioss/http/index'
import { Button,Table,Icon,Modal,message,Search,Input } from 'antd';

import RestaurantForm from './RestaurantForm'

import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';

class Restaurant extends React.Component{
    constructor(){
        super();
        this.state={
            restaurants:[],
            restaurant:{},
            visible:false
        }
    }

    componentWillMount(){
        this.loadRestaurant();
    }

    loadRestaurant(){
        axios.get('/restaurant/findAll')
        .then((result)=>{
        this.setState({
            restaurants:result.data
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
                axios.get('/restaurant/deleteRestaurantById',{
                    params:{id}
                  }).then((result)=>{
                    this.loadRestaurant();
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
               console.log(values)
               
            axios.post('/restaurant/saveOrupdateRestaurant',values)
                    .then(()=>{
                        this.setState({ visible: false, });
                        this.loadRestaurant();
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
            restaurant:{}
        })
    }

    //修改
    toEdit(record){
        this.setState({
            visible:true,
            restaurant:record
        })
    }

    //查看产品
    toLook(record){
        // alert(JSON.stringify(record));
        this.props.history.push({
            pathname:'/RestaurantDetails',
            state:record,
        });
    
    }

    RestaurantFormRefs=(form)=>{
        this.form=form;
    }

    
    render(){
        let {restaurants}=this.state;
        const { Search } = Input;

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
                title:'饭店',
                dataIndex:"name",
            },
            {
                title:'饭店地址',
                dataIndex:"address"
            },
            {
                title:'饭店电话',
                dataIndex:"phone"
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
                            <Icon type="eye"  onClick={this.toLook.bind(this,record)}/>
                        </div>
                    )
                }
            }
        ]


        return(
            
            <div className="restaurant">
                <div className="btn">
                <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>
                </div>
                <Search placeholder="input search text" style={{ width: 200 }}/>
                <Table rowSelection={rowSelection} columns={conlums} dataSource={this.state.restaurants} bordered="true"/>
                <Modal
                    title="添加饭店"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    
                    <RestaurantForm initData={this.state.restaurant} ref={this.RestaurantFormRefs}/>
                </Modal>
            </div>
        )
    }
}




export default Restaurant;