import React, { Component } from 'react';
import { Segment, Grid, Divider, Button } from 'semantic-ui-react';


class Choose extends Component {
    render(){
        return(
			<Segment placeholder>
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
				      Current Games
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
