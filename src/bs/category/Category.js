import React from 'react';
import axios from '../axioss/http/index'
import { Button,Table,Icon,Modal,message } from 'antd';

import CategoryForm from './CategoryForm';

class Category extends React.Component{
    constructor(){
        super();
        this.state={
            categorys:[],
            category:{},
            visible:false
        }
    }

    componentWillMount(){
        this.loadCategory();
    }

    loadCategory(){

        axios.get('/category/findAll')
        .then((result)=>{
        this.setState({
            categorys:result.data
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
                axios.get('/category/deleteCategoryById',{
                    params:{id}
                  }).then((result)=>{
                    this.loadCategory();
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
                axios.post('/category/saveOrupdateCategory',values)
                    .then(()=>{
                        this.setState({ visible: false, });
                        this.loadCategory();
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
            category:{}
        })
    }

    toEdit(record){
        this.setState({
            visible:true,
            category:record
        })
    }
    

    CategoryFormRefs=(form)=>{
        this.form=form;
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
                            <Icon type="edit" onClick={this.toEdit.bind(this,record)}/>&nbsp;
                            <Icon type="eye"/>
                        </div>
                    )
                }
            }
        ]
        return(
            <div className="category">
                <div className="btn">
                <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>
                </div>

                <Table rowSelection={rowSelection} columns={conlums} dataSource={this.state.categorys} bordered="true"/>
                
                <Modal
                    title="添加种类"
                    visible={this.state.visible}  //显示表格
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}

                >

                    <CategoryForm initData={this.state.category} ref={this.CategoryFormRefs}/>
                </Modal>
                
            </div>
        )
    }
}




export default Category;