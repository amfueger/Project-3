import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
// import serverURL from './serverURL.js';
import VoteContainer from '../VoteContainer';


class GameCurrent extends Component {
  constructor(){
        super();
        this.state = {
        	currentGame: [],
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

    	parsedResponse.data.forEach(game => {
			if (game.status === 'Current') {							// Find the ONE game that is current and set state
		    	this.setState({currentGame: game})
			}
    	});


    }).catch((err) => {
      console.error(`Error: `, err);
    })     
  }

	// -----v----- This is where the ChatBox should be rendered/hidden -----v----- //
  
    render(){
      	console.log(`this.state in GameCurrent: `, this.state);
    	// const currentGame = this.state.currentGame.map(game => {
    	// 	return (
    	// 	)
    	// });

        return(
        	<div>
	            <Header as="h1">Current Game</Header>
	            <Segment>
	        		<Header as="h3">{this.state.currentGame.title}</Header>
	        		<Header as="h4">{this.state.currentGame.description}</Header>
	        		<Segment><VoteContainer /></Segment>
	            </Segment>
            </div>
            
        )
    }
}
export default GameCurrent;
