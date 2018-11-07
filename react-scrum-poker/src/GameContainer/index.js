import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import Repos from '../Repos';
import GameCreateFinal from '../GameCreateFinal';
import GameCreateUserStory from '../GameCreateUserStory';
import GameCreateEstimInvites from '../GameCreateEstimInvites';
import { Header } from 'semantic-ui-react';


class GameContainer extends Component {

	constructor(){
    super();

    this.state = {
    	gamePage: 'GameCreateUserStory',
    	games: [],
    	game : {
	    	title: '',
	    	description: '',
	    	_id: '',
	    	estimators: []
	    }
    }
    this.updateGamePageShowing = this.updateGamePageShowing.bind(this);
	}

  updateGamePageShowing = async (gamePage) => {
    // e.preventDefault();
      console.log(`gamePage: `, gamePage);

      await this.setState({gamePage: gamePage});
  }


	updateUserStory = async (userStory, e) => {
		e.preventDefault();

		try {
			// await console.log(`userStory: `, userStory);
	    await this.setState({
	    	game: {
	    		title: userStory.title,
	    		description: userStory.description
	    	}
	    });

	    await console.log(`this.state in updateUserStory() GameContainer: `, this.state);

		} catch(err){
			console.error(`Error in updateUserStory() GameContainer`, err);
		}
	}


	updateEstimators = async (data, e) => {
		e.preventDefault();

		try {

			console.log(`'data' in updateEstimators() in GameContainer: `, data);
	    await this.setState({
	    	game: {
	    		title: this.state.game.title,
	    		description: this.state.game.description,
	    		estimators: data.estimators
	    	}
	    });

	    await console.log(`this.state in updateEstimators() GameContainer: `, this.state);

		} catch(err){
			console.error(`Error in updateEstimators() GameContainer`, err);
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
      	<Header as="h1">--------------- GameContainer ---------------

        {this.state.gamePage === "GameCreateUserStory" ? 
          <div>
            <GameCreateUserStory updateGamePageShowing={this.updateGamePageShowing} updateUserStory={this.updateUserStory}/>
          </div> 
          : null}       
        {this.state.gamePage === "Repos" ? 
          <div>
            <Header as="h2">Repos</Header>
            <Repos updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}       
        {this.state.gamePage === "GameCreateEstimInvites" ? 
          <div>
            <Header as="h2">Estimator Invites</Header>
            <GameCreateEstimInvites updateGamePageShowing={this.updateGamePageShowing} updateEstimators={this.updateEstimators} appState={this.props.appState}/>
          </div> 
          : null}  
        {this.state.gamePage === "GameCreateFinal" ? 
          <div>
            <Header as="h2">Overview</Header>
            <GameCreateFinal updateGamePageShowing={this.updateGamePageShowing} addGame={this.addGame} gameToCreate={this.state.game}/>
          </div> 
          : null}  
      	</Header>
      )
    }
}
export default GameContainer;
		        // <Route exact path="/new" component={ GameCreate }/>
		        // <Route exact path="/current" component={ GameCurrent }/>
	    		// <Route exact path="/pending" component={ ProfileContainer }/>
		      	// <Route exact path="/past" component={ GameContainer }/>
