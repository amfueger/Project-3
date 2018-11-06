import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import Repos from '../Repos';
import GameCreateUserStory from '../GameCreateUserStory';
import GameCreateEstimInvites from '../GameCreateEstimInvites';
import { Header } from 'semantic-ui-react';


class GameContainer extends Component {

	constructor(){
	    super();
	    this.state = {
	    	pageShowing: '',
	    	games: [],
	    	game : {
		    	title: '',
		    	description: '',
		    	_id: '',
		    	estimatorInvites: []
		    }
	    }
	}

	updateGame = async (userStory, e) => {
		e.preventDefault();

		try {

			await console.log(`userStory: `, userStory);

	    await this.setState({
	    	game: {
	    		title: userStory.title,
	    		description: userStory.description
	    	}
	    });
	    await console.log(`this.state in updateGame() GameContainer: `, this.state);

		} catch(err){
			console.error(`Error in updateGame() GameContainer`, err);
		}



	}

	handleSubmit = () => {
		console.log(this.state);
	}

  addGame = async (game, e) => {
    e.preventDefault();
    console.log(`this.state in addGame() GameContainer: `, this.state);
    console.log(`game in addGame() GameContainer: `, game);

    try {
      const createdGame = await fetch('http://localhost:9000/games/', {
        method: 'POST',
        body: JSON.stringify(game),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = await createdGame.json();
      await console.log(`parsedResponse from addGame: `, parsedResponse);

      await this.setState({game: [...this.state.game, parsedResponse.data]})
			await console.log(`State after adding game: `, this.state);      

    } catch(err){
        console.log('error')
        console.log(err)
    }
  }

    render(){
      return(
      	<div>--------------- GameContainer ---------------
      		<GameCreateUserStory updateGame={this.updateGame}/>
      		{this.state.pageShowing === "GameCreateUserStory" ? 
      			<div>
	      			<Header as="h2">User Story</Header>
	      			<GameCreateUserStory updateGame={this.updateGame}/>
      			</div> 
      			: null}     	
      		{this.state.pageShowing === "Repos" ? 
      			<div>
	      			<Header as="h2">Repos</Header>
	      			<Repos />
      			</div> 
      			: null}     	
      		{this.state.pageShowing === "GameCreateEstimInvites" ? 
      			<div>
	      			<Header as="h2">Estimator Invites</Header>
	      			<GameCreateEstimInvites addGame={this.addGame} />
      			</div> 
      			: null}     	
	      </div>
      )
    }
}
export default GameContainer;
		        // <Route exact path="/new" component={ GameCreate }/>
		        // <Route exact path="/current" component={ GameCurrent }/>
		    		// <Route exact path="/pending" component={ ProfileContainer }/>
		      	// <Route exact path="/past" component={ GameContainer }/>
