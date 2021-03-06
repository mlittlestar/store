import React from 'react';
import axios from '../axioss/http/index'
import { Button, Table,Icon,Modal,message } from 'antd';
import FootForm from './FootForm'

class Foot extends React.Component{
    constructor(){
        super();
        this.state={
            foots:[],
            foot:{},
            visible:false
            
        }
    }

    componentWillMount(){
        this.loadFoot();
    }

    loadFoot(){
        axios.get('/foot/findAllWithROrC')
        .then((result)=>{
        this.setState({
            foots:result.data
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
                 axios.get('/foot/deleteFootById',{
                    params:{id}
                  }).then((result)=>{
                    this.loadFoot();
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


    handleOk = e => {
        // 1. 获取表单数据
          e.preventDefault();
          this.form.validateFields((err, values) => {
          if (!err) {
            
                axios.post('/foot/saveOrupdateFoot',values)
                    .then(()=>{
                        this.setState({ visible: false, });
                        this.loadFoot();
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
    
      // 点击了模态框的取消按钮
      handleCancel = e => {
      this.setState({ visible: false, });
    };


    toAdd(){
        this.setState({
            visible:true,
            foot:{}
        })
    }
    //修改
    toEdit(record){
        this.setState({
            visible:true,
            foot:record
        })
    }

    


     // ref函数
     FootFormRefs = (form)=>{
        this.form = form;
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
                title:'菜价钱',
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
                            <Icon type="delete" onClick={this.toDelete.bind(this,record.id)}/>&nbsp;
                            <Icon type="edit" onClick={this.toEdit.bind(this,record)}/>&nbsp;
                            <Icon type="eye"/>
                        </div>
                    )
                }
            }
        ]
        return(
            <div className="foot">
                <div className="btn">
                    <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>
                </div>
                <Table rowSelection={rowSelection} columns={conlums} dataSource={this.state.foots} bordered="true"/>

                <Modal
                    title="添加菜品"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                     <FootForm initData={this.state.foot} ref={this.FootFormRefs}/>   
                </Modal>
            </div>
        )
    }
}




export default Foot;