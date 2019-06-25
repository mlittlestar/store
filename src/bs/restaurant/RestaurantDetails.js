import React from 'react';
import {Button} from 'antd';

class RestaurantDetails extends React.Component{
    constructor(props){
        super(props);
    }

    goBack(){
        this.props.history.goBack();
    }

    render(){
        let restaurantdetails=this.props.history.goBack();
        return(
            <div className="restaurantDetails">
                <h2>详细信息</h2>
                <Button type="link" onClick={this.goBack.bind(this)}>返回</Button>
            </div>
        )
    }
}


export default RestaurantDetails;