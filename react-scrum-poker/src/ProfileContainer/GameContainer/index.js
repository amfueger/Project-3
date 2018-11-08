import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import Repos from './Repos';
import RepoIssues from './RepoIssues';
import Choose from './Choose';
import GamesPast from './GamesPast';
import GameCurrent from './GameCurrent';
import GamesPending from './GamesPending';
import GameCreateFinal from './GameCreateFinal';
import GameCreateUserStory from './GameCreateUserStory';
import GameCreateEstimInvites from './GameCreateEstimInvites';
import { Header } from 'semantic-ui-react';


class GameContainer extends Component {

	constructor(){
    super();

    this.state = {
    	gamePage: 'Choose',
    	game : {
	    	title: '',
	    	description: '',
        scrumMaster: [],
	    	estimators: [],
        status: 'Pending'
	    }
    }
    // this.updateGamePageShowing = this.updateGamePageShowing.bind(this);
	}

  updateGamePageShowing = async (gamePage) => {
      this.setState({gamePage: gamePage});
  }


	updateUserStory = async (userStory, e) => {
		e.preventDefault();

		try {
	    this.setState({
	    	game: {
	    		title: userStory.title,
	    		description: userStory.description
	    	}
	    });

		} catch(err){
			console.error(`Error in updateUserStory() GameContainer`, err);
		}
	}


	updateEstimators = async (data, e) => {
		e.preventDefault();

		try {

			console.log(`'data' in updateEstimators() in GameContainer: `, data);

	    this.setState({
	    	game: {
	    		title: this.state.game.title,
	    		description: this.state.game.description,
	    		estimators: data.estimators,
          scrumMaster: data.scrumMaster,
          status: 'Pending'
	    	}
	    });

		} catch(err){
			console.error(`Error in updateEstimators() GameContainer`, err);
		}

	}


  addGame = async () => {

    try {

      console.log(`this.state in addGame() GameContainer before fetch: `, this.state);

      const createdGame = await fetch('http://localhost:9000/games/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state.game),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = await createdGame.json();

      console.log(`parsedResponse from addGame: `, parsedResponse);

      this.updateGamePageShowing('Choose');

    } catch(err){
        console.log('error')
        console.log(err)
    }
  }

    render(){
      return(
        <fieldset>
      	<legend as="h1">Games</legend>
        
        {this.state.gamePage === "Choose" ? 
          <div>
            <Choose 
            updateGamePageShowing={this.updateGamePageShowing} 
            />
          </div> 
          : null} 
        {this.state.gamePage === "GameCreateUserStory" ? 
          <div>
            <GameCreateUserStory 
            updateGamePageShowing={this.updateGamePageShowing} 
            updateUserStory={this.updateUserStory}/>
          </div> 
          : null}       
        {this.state.gamePage === "Repos" ? 
          <div>
            <Header as="h2">Repos</Header>
            <Repos updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}  
        {this.state.gamePage === "RepoIssues" ? 
          <div>
            <Header as="h2">RepoIssues</Header>
            <RepoIssues updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}          
        {this.state.gamePage === "GameCreateEstimInvites" ? 
          <div>
            <Header as="h2">Estimator Invites</Header>
            <GameCreateEstimInvites 
            updateGamePageShowing={this.updateGamePageShowing} 
            updateEstimators={this.updateEstimators} 
            appState={this.props.appState}/>
          </div> 
          : null}  
        {this.state.gamePage === "GameCreateFinal" ? 
          <div>
            <Header as="h2">Overview</Header>
            <GameCreateFinal 
            updateGamePageShowing={this.updateGamePageShowing} 
            addGame={this.addGame} 
            gameToCreate={this.state.game}/>
          </div> 
          : null}  
        {this.state.gamePage === "GamesPast" ? 
          <div>
            <Header as="h2">GamesPast</Header>
            <GamesPast updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}          
        {this.state.gamePage === "GameCurrent" ? 
          <div>
            <Header as="h2">GameCurrent</Header>
            <GameCurrent updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}          
        {this.state.gamePage === "GamesPending" ? 
          <div>
            <GamesPending updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}          
        </fieldset>	
      )
    }
}
export default GameContainer;
		        // <Route exact path="/new" component={ GameCreate }/>
		        // <Route exact path="/current" component={ GameCurrent }/>
	    		// <Route exact path="/pending" component={ ProfileContainer }/>
		      	// <Route exact path="/past" component={ GameContainer }/>
