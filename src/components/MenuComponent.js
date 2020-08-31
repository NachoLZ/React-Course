import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { DISHES } from '../shared/dishes';
import { Card, CardImg, CardImgOverlay, CardText , CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {

    constructor(props){
        super(props);
        this.state ={
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish});
    }

    renderDish(dish) {
        if (dish != null) {
            return(
                <Card>
                    <CardImg width='100%' object src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                    
                </Card>
            );
        }
        else {
            return(<div></div>);
        }
    }

    render() {
        const menu = this.state.dishes.map((dish) => { 
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick ={() => this.onDishSelect(dish)}>
                        <CardImg width='100%' object src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return(
            <div clarrName="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        );
    }
}

export default Menu;