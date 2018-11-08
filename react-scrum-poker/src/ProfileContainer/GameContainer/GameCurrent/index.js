import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';


class GameCurrent extends Component {
  constructor(){
        super();
        this.state = {
        	currentGame: null,
        	chatState: '' 			// Hidden or shown
        }
    }

  getGames = async () => {
    const games = await fetch('http://localhost:9000/games', {    		// Fetch all games
	      credentials: 'include'
	    }); 	  
    const gamesParsedJSON = await games.json();
    
    console.log(`gamesParsedJSON from GamesPending: `, gamesParsedJSON);
    return gamesParsedJSON;
  };

  componentDidMount(){
    this.getGames().then(parsedResponse => { 

    	console.log(`parsedResponse in componentDidMount GameCurrent: `, parsedResponse);

    	let currentGame = null;

    	parsedResponse.data.forEach(game => {
			if (game.status === 'Current') {							// Find the ONE game that is current and set state
				currentGame = game;
			}
    	});

    	this.setState({currentGame: currentGame})

    }).catch((err) => {
      console.error(`Error: `, err);
    })    
    
  }

	// -----v----- This is where the ChatBox should be rendered/hidden -----v----- //
	        		// <Header as="h3">{currentGame.title}</Header>
	        		// <Header as="h4">{currentGame.description}</Header>
	            // {this.state.currentGame.title}

    render(){
      	console.log(`this.state in GameCurrent: `, this.state);
    	// const currentGame = this.state.currentGame;
        return(
        	<div>
	            <Header as="h1">Current Game</Header>
            </div>
            
        )
    }
}
export default GameCurrent;
