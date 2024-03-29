import React, { Component } from 'react';
import { Card, CardImg, CardText , CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Label, Col, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Control } from 'react-redux-form';
import { FadeTransform } from 'react-animation-components';



    class CommentForm extends Component {

        constructor(props){
            super(props);
            this.state = {
                isModalOpen : false,
                author: '',
                rating: '',
                comment: '',
                touched: {
                    author: false,
                    rating: false,
                    comment: false
                }
            }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleBlur = this.handleBlur.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
        }
    
        handleInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
    
            this.setState({
                [name]: value
            });
        }

        toggleModal() {
            this.setState({
                isModalOpen :!this.state.isModalOpen
            });
        }
    
        handleSubmit(values){
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        handleBlur = (field) => (evt) => {
            this.setState({
                touched: {...this.state.touched, [field]: true }
            });
        }

        validate(author) {
            const errors = {
                author: ''
            };
    
            if (this.state.touched.author && author.length < 3)
                errors.author = 'Must be greater than 3 characters.';
            else if (this.state.touched.author && author.length > 15)
                errors.author = 'Must be 15 characters or less';
            
                return errors;
        }

        render(){
            const errors = this.validate(this.state.author);
            return(
                <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg">Submit Comment</span>
                </Button>  
                <Modal isOpen ={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type ="select" id="rating" name="rating" innerRef={(input) => this.rating = input}>
                                    onChange={this.handleInputChange} 
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" className="form-control" onChange={this.handleInputChange} valid={errors.author === ''}
                                        invalid={errors.author !== ''}/>
                                <FormFeedback>{errors.author}</FormFeedback>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Input type="textarea" id="comment" name="comment"
                                        rows="12"
                                        innerRef={(input) => this.comment = input}
                                        onChange={this.handleInputChange}  />
                                </Col>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                </React.Fragment>
            );
        }
    }

    function RenderDish({dish}) {

            return(

                <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>

            );
        
    }

    function RenderComments({comments, postComment, dishId}){
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
                        <CommentForm dishId={dishId} postComment={postComment} /> 
                </Card>
            );   
 
    }


    const DishDetail = (props) =>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {

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
                        <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                    </div>
                </div>    
            </div>
        );
        
        }else{
            return(<div></div>);
        }
    }




export default DishDetail;