import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';


class GameCreate extends Component {
  constructor(){
    super();

    this.state = {
      title: '',
      description: ''
    }
  }
  
  updateMovie = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  render(){
    return(
      <div>
        <h1>Create Game</h1>
        <Segment>
        	<h3>User Story</h3>
          <Form onSubmit={this.props.addGame.bind(null, this.state)}>

            <Label htmlFor="name=title">Title:</Label>
            <Form.Input type='text' name='title' value={this.state.title} onChange={this.updateMovie}/>

            <Label>Description:</Label>
            <Form.Input type='text' name='description' value={this.state.description} onChange={this.updateMovie}/>

            <Button color="blue" type='Submit'>Create Game</Button>
          </Form>
        </Segment>
      </div>            
    )
  }
}
export default GameCreate;
