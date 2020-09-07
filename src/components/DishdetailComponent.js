import React from 'react';
import { Card, CardImg, CardText , CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



    function RenderDish({dish}) {

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


    function RenderComments({comments}){
            const comm = comments.map((c) => { 
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


    const DishDetail = (props) =>{
        if (props.dish != null) {

        return(
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    
                </div>
                <div className="row">
                    <div className="container" className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>    
            </div>
        );
        
        }else{
            return(<div></div>);
        }
    }




export default DishDetail;