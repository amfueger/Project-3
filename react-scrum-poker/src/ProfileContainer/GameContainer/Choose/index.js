import React, { Component } from 'react';
import { Segment, Grid, Divider, Button, Header } from 'semantic-ui-react';


class Choose extends Component {
    render(){
        return(
			<Segment placeholder>
			<Header as="h2">My Games</Header>
			<Grid columns={2} divided stackable textAlign='center'>

			  <Grid.Row verticalAlign='middle'>
			    <Grid.Column>
			      <Button primary color="green" onClick={() => this.props.updateGamePageShowing("GameCreateUserStory")}>
				      New Game
				    </Button>
			    </Grid.Column>
				  
				  <Divider vertical></Divider>

			    <Grid.Column>
			      <Button primary color="green" onClick={() => this.props.updateGamePageShowing("GameCurrent")}>
				      Current Game
				    </Button>
			    </Grid.Column>
			  </Grid.Row>

			  <Grid.Row verticalAlign='middle'>
			    <Grid.Column>
			      <Button primary color="green" onClick={() => this.props.updateGamePageShowing("GamesPending")}>
				      Pending Games
				    </Button>
			    </Grid.Column>
				  
				  <Divider vertical></Divider>

			    <Grid.Column>
			      <Button primary color="green" onClick={() => this.props.updateGamePageShowing("GamesPast")}>
				      Past Games
				    </Button>
			    </Grid.Column>
			  </Grid.Row>			
			  </Grid>
			</Segment>
        )
    }
}
export default Choose;
