import React, { Component } from 'react';
import { Form, Button, Segment, Header, Grid } from 'semantic-ui-react';


class GameCreateUserStory extends Component {
  constructor(){
    super();

    this.state = {
      title: '',
      description: '',
      disabled: true
    }
  }
  

  handleClick = () => this.setState({       // Button disable/enable
    disabled: !this.state.disabled
  })


  updateUserStoryState = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  };


  render(){
    const disabled = this.state.disabled;
    return(
      <div>
        <Header as="h1">Create Game</Header>
        <Segment>
        	<Header as="h2">User Story</Header>
          <Form onSubmit={this.props.updateUserStory.bind(null, this.state)}>

            <Form.Input label='Title:' type='text' name='title' value={this.state.title} onChange={this.updateUserStoryState}/>

            <Form.Input label='Description:' type='text' name='description' value={this.state.description} onChange={this.updateUserStoryState}/>

            <Grid columns={2} stackable textAlign='center'>

              <Grid.Row verticalAlign='middle'>

                <Grid.Column style={{width: '100%'}}>
                  <small>Cannot be undone</small><br/>
                  <Button onClick={this.handleClick} 
                    color="green" 
                    type='Submit'
                    >
                      Submit User Story
                  </Button>
                </Grid.Column>
                
                <Grid.Column>
                  <Button onClick={() => this.props.updateGamePageShowing("GameCreateEstimInvites")} 
                    disabled={disabled} 
                    color="green" 
                    floated="right"
                  >
                    Estimators ->
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </div>            
    )
  }
}
export default GameCreateUserStory;
