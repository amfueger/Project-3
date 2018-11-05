import React, { Component } from 'react';
import { Header, Divider, Container, Grid } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import InstructionsEstimator from '../InstructionsEstimator';
import InstructionsScrum from '../InstructionsScrum';

class InstructionsContainer extends Component {
	constructor(){
		super();
		this.state={ 
			scrumshow: false,
			estimatorshow: false
		};
	}
  handleOpenScrum = () => {
  	this.setState({
  		scrumshow: true
  	})
  }
  handleCloseScrum = () => {
  	this.setState({
  		scrumshow: false
  	})
  }
  handleOpenEstimator = () => {
  	this.setState({
  		estimatorshow: true
  	})
  }
  handleCloseEstimator = () => {
  	this.setState({
  		estimatorshow: false
  	})
  }
  render() {
    return(
      <div>
      <Container fluid>
      <Header as='h2'>What is Planning Poker?</Header>
      <p>
      	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita nihil iusto similique, vero autem facilis, nulla dolorem architecto nisi mollitia optio commodi placeat, corporis dolore repudiandae unde perspiciatis asperiores deleniti?
      </p>
      <Divider />
      <Grid columns='equal'>
      	<Grid.Row>
      		<Grid.Column>
      		<InstructionsScrum />
					</Grid.Column>
					<Grid.Column>
					<InstructionsEstimator />
					</Grid.Column>
				</Grid.Row>
			</Grid>
			</Container>
    	</div>
    )
  }
}
export default InstructionsContainer;
