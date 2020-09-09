import React, { Component } from 'react';
import { Card, CardImg, CardText , CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Label, Col, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


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
    
        handleSubmit(event){
            this.toggleModal();
            alert("Author: " + this.author.value + " Rating: " + this.rating.value + " Comment: " + this.comment.value);
            event.preventDefault();
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
    
            if (this.state.touched.author && author.length < 2)
                errors.author = 'Must be greater than 2 characters.';
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
                                <Input type ="text" id="author" name="author" innerRef={(input) => this.author = input} onBlur={this.handleBlur('author')}
                                        onChange={this.handleInputChange} valid={errors.author === ''}
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
                        <CommentForm /> 
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