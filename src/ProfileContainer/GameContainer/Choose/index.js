import React, { Component } from 'react';
import { Segment, Grid, Divider, Button, Header } from 'semantic-ui-react';


class Choose extends Component {
    render(){
        return(
			<Segment placeholder>
			<Header as="h2">My Games</Header>
			<Grid columns={2} divided='vertically' textAlign='center'>

			  <Grid.Row>
			    <Grid.Column verticalAlign='middle'>
			      <Button primary color="green" onClick={() => this.props.updateGamePageShowing("GameCreateUserStory")}>
				      New Game
					  </Button>
			    </Grid.Column>

			    <Grid.Column verticalAlign='middle'>
			      <Button primary color="black" inverted onClick={() => this.props.updateGamePageShowing("Repos")}>
				      New Game <br/> with GitHub
				    </Button>
			    </Grid.Column>
			  </Grid.Row>


			  <Grid.Row>  
			    <Grid.Column verticalAlign='middle'>
			      <Button color="green" disabled={this.props.ongoingGame} onClick={() => this.props.updateGamePageShowing("GameCurrent")}>
				      Current Game
				  </Button>
			    </Grid.Column>

			    <Grid.Column verticalAlign='middle'>
			      <Button inverted color="red" disabled={!this.props.ongoingGame} onClick={() => this.props.updateGamePageShowing("GamesPending")}>
				      Pending Games
					  </Button>
			    </Grid.Column>

			  </Grid.Row>


			  <Grid.Row>
			    <Grid.Column verticalAlign='middle'>
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
