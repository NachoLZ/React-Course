import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText , CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
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


    renderComments(dish){
        if (dish != null){
            const comm = dish.comments.map((c) => { 
                let date = new Date( Date.parse(c.date) );
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                const months = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sept',
                    'Oct',
                    'Nov',
                    'Dec'
                ]

                return (
                    <div>
                        <CardText>{c.comment} <CardText /> -- {c.author}, {months[month]} {day}, {year}</CardText>
                        <CardText />
                    </div>
                );
            });
            return(
                <Card>
                    <CardTitle>Comments</CardTitle>
                        <CardBody>
                            <CardText>{comm}</CardText>
                        </CardBody>
                </Card>
            );   

        }
        else {
            return(<div></div>);
        }
    }


    render() {

        return(
            <div className="container" className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.thisdish)}
            {this.renderComments(this.props.thisdish)}
            
            </div>
        );
    }
}



export default DishDetail;