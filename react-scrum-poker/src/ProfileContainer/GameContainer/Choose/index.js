import React, { Component } from 'react';
import { Segment, Grid, Divider, Button, Header } from 'semantic-ui-react';


class Choose extends Component {
    render(){
        return(
			<Segment placeholder>
			<Header as="h2">My Games</Header>
			<Grid columns={3} divided stackable textAlign='center'>

			  <Grid.Row >
			    <Grid.Column verticalAlign='middle'>
			      <Button primary color="green" onClick={() => this.props.updateGamePageShowing("GameCreateUserStory")}>
				      New Game
				  </Button>

			      <Button primary color="black" inverted onClick={() => this.props.updateGamePageShowing("Repos")}>
				      New Game <br/>with GitHub
				    </Button>
			    </Grid.Column>
			  </Grid.Row>

			  <Grid.Row >  
			    <Grid.Column>
			      <Button color="green" onClick={() => this.props.updateGamePageShowing("GameCurrent")}>
				      Current Game
				    </Button>

			      <Button inverted color="red" onClick={() => this.props.updateGamePageShowing("GamesPending")}>
				      Pending Games
				    </Button>
			    </Grid.Column>
			  </Grid.Row>
				  
			  <Grid.Row verticalAlign='middle'>
			    <Grid.Column>
			      <Button onClick={() => this.props.updateGamePageShowing("GamesPast")}>
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
