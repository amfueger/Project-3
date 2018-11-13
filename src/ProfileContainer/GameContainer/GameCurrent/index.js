import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
// import serverURL from './serverURL.js';
import VoteContainer from './VoteContainer';
import RoundContainer from './RoundContainer';


class GameCurrent extends Component {
  constructor(){
    super();
    this.state = {
    	currentGame: null,
    	chatState: '', 			// Hidden or shown
      session: null,
    }
  }


  // -----v----- This is where the ChatBox should be rendered/hidden -----v----- //

  render(){

    console.log(`this.state in GameCurrent: `, this.state);
              // <RoundContainer game={this.state.currentGame}></RoundContainer>

    return(
      <div>
        <Header as="h1">Current Game</Header>
        <Segment>

          <Header as="h3">{this.props.currentGame.title}</Header>
          <Header as="h4">{this.props.currentGame.description}</Header>
          <VoteContainer 
            currentGameState={this.props.currentGame}
            votesLeft={this.props.votesLeft}
            disabled={this.props.disabled}
            vote={this.props.vote}
            handleSubmitVote={this.props.handleSubmitVote}
            handleChange={this.props.handleChange}
            getGames={this.props.getGames}>
          </VoteContainer>

        </Segment>
      </div>
    )
  }
}
export default GameCurrent;
