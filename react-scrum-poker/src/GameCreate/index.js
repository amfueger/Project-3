import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class GameCreate extends Component {

	constructor(){
    super();
    this.state = {

        
    }
	}

    render(){
      return(
				<div>
	        <h4>Create Game</h4>

	        <Segment>
	          <Form onSubmit={this.props.addMovie.bind(null, this.state)}>

	            <Label htmlFor="name=title">Title:</Label>
	            <Form.Input type='text' name='title' value={this.state.title} onChange={this.updateMovie}/>

	            <Label>Issue:</Label>
	            <Form.Input type='text' name='description' value={this.state.description} onChange={this.updateMovie}/>

	            <Button color="green" type='Submit'>Create Movie</Button>

	          </Form>
	        </Segment>
	      </div>        
      )
    }
}
export default GameCreate;
