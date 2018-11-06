import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import GameCreate from '../GameCreate';


class GameContainer extends Component {

	constructor(){
	    super();
	    this.state = {
	    	games: [],
	    	title: '',
	    	description: '',
	    	_id: ''
	    }
	}

	updateGame = (e) => {
	    this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}

	handleSubmit = () => {
		console.log(this.state);
	}

  addGame = async (game, e) => {
    e.preventDefault();
    console.log(game);

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

      await this.setState({games: [...this.state.games, parsedResponse.data]})
			await console.log(`State after adding game: `, this.state);      

    } catch(err){
        console.log('error')
        console.log(err)
    }
  }

    render(){
      return(
      	<div>--------------- GameContainer ---------------
      		<GameCreate addGame={this.addGame}/>     	
	      </div>
      )
    }
}
export default GameContainer;
		        // <Route exact path="/new" component={ GameCreate }/>
		        // <Route exact path="/current" component={ GameCurrent }/>
		    		// <Route exact path="/pending" component={ ProfileContainer }/>
		      	// <Route exact path="/past" component={ GameContainer }/>
