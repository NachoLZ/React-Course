import React from 'react';
import { Card, CardImg, CardText , CardBody, CardTitle } from 'reactstrap';




    function RenderDish({dish}) {
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


    function RenderComments({dish}){
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


    const DishDetail = (props) =>{

        return(
            <div className = "container">
                <div className="row">
                    <div className="container" className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.thisdish} />
                        <RenderComments dish={props.thisdish} />
                    </div>
                </div>    
            </div>
        );
    }




export default DishDetail;