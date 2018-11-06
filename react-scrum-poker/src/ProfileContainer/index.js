import React, { Component } from 'react';
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class ProfileContainer extends Component {

  render(){
    return(
    	<div>
    	<Header as="h2">ProfileContainer</Header>
			<Segment placeholder>
			<Grid columns={2} divided stackable textAlign='center'>
			  <Divider vertical></Divider>

			  <Grid.Row verticalAlign='middle'>
			    <Grid.Column>
			      <Button primary as={ Link } name='new' to='/new'>
				      New Game
				    </Button>
			    </Grid.Column>

			    <Grid.Column>
			      <Button primary as={ Link } name='current' to='current'>
				      Current Games
				    </Button>
			    </Grid.Column>
			  </Grid.Row>

			</Grid>
			</Segment>
			</div>
    )
  }
}
export default ProfileContainer;

				// <Grid.Row verticalAlign='middle'>
			 //    <Grid.Column>
			 //      <Button primary as={ Link } name='pending' to='pending'>
				//       Pending Games
			 //      </Button>
			 //    </Grid.Column>

			 //    <Grid.Column>
			 //      <Button primary as={ Link } name='past' to='past'>
				//       Past Games
				//     </Button>
			 //    </Grid.Column>
			 //  </Grid.Row>
