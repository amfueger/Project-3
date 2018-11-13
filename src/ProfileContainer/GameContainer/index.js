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

import chatKeys from './config.js';
import Chatkit from '@pusher/chatkit';

// import serverURL from '.../serverURL.js';


class GameContainer extends Component {

  constructor(){
    super();

    this.state = {
      pageShowing: 'Choose',
      ongoingGame: false,
      currentGame: null,
      game: {
        title: '',
        description: '',
        scrumMaster: null,
        estimators: [],
        status: '',
        roomId: '',
        currentUser: ''
      },
      vote: {
        voter: '',
        choice: ''
      },
      votesLeft: null,
      disabled: false
    }
  }


  updateGamePageShowing = async (pageShowing) => {
      this.setState({pageShowing: pageShowing});
  }


  // ------------------------------ Handle Vote Change ------------------------------ //

  handleChange = (e) => {
    this.setState({
      vote: {
        voter: this.props.appState.userId,
        choice: e.currentTarget.value
      }
    })
  }


  // ------------------------------ MAKE ALL USERS AVAILABLE ------------------------------ //

  getUsers = async () => {
    const estimators = await fetch('http://localhost:9000/users/', {    // Fetch all users
      credentials: 'include'
    });     
    const estimatorsParsedJSON = await estimators.json();
    console.log(`estimatorsParsedJSON: `, estimatorsParsedJSON);
    return estimatorsParsedJSON;
  }


  // ------------------------------ MAKE ALL GAMES AVAILABLE ------------------------------ //
  
  getGames = async () => {
    const games = await fetch('http://localhost:9000/games/', {    // Fetch all games
      credentials: 'include'
    });     
    const gamesParsedJSON = await games.json();
    console.log(`gamesParsedJSON: `, gamesParsedJSON);
    return gamesParsedJSON;
  }


  // ------------------------------ UPDATE GameToBeCreated USER STORY ------------------------------ //

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


  // ------------------------------ UPDATE GameToBeCreated ESTIMATORS ------------------------------ //

  updateEstimators = async (data, e) => {     // The last time before game creation that the GameContainer state is updated
    e.preventDefault();                       // It will be GameContainer's state's data that will be used to create the new game

    try {

      console.log(`'data' in updateEstimators() in GameContainer: `, data);

      const chatManager = await new Chatkit.ChatManager({
        instanceLocator: chatKeys.instanceLocator,
        userId: data.scrumMaster.username,
        tokenProvider: new Chatkit.TokenProvider({
          url: chatKeys.testToken
        })
      });

      console.log(`chatManager from updateEstimators(): `, chatManager);

      await chatManager.connect()
    .then(chatManagerResponse => {
      console.log(`chatManagerResponse inside Chatmanager updateEstimators(): `, chatManagerResponse);

      this.setState({
        game: {
          title: this.state.game.title,
          description: this.state.game.description,
          estimators: data.estimators,
          scrumMaster: data.scrumMaster,
          status: 'Pending',                    // Game status set to 'Pending', ready for creation
          currentUser: chatManagerResponse
        }
      });
    })
    .catch(err => console.log('err on connecting', err));

    } catch(err){
      console.error(`Error in updateEstimators() GameContainer`, err);
    }
  }


  // ------------------------------ UPDATE GAME STATUS ------------------------------ //

  updateGameStatus = async (game, newStatus) => {       // Game Status to be updated from 'Pending' to 'Current' to 'Past' when game is JOINED/OVER
    try {
      console.log(`game: `, game);
      console.log(`newStatus: `, newStatus);

      const updateGameState = await fetch('http://localhost:9000/games/' + game._id, {
        method: 'PUT',
        body: JSON.stringify({
            title: game.title,
            description: game.description,
            scrumMaster: game.scrumMaster,
            estimators: game.estimators,
            roomId: game.roomId,
            status: newStatus
            // currentUser: game.currentUser
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const updateGameStateParsed = await updateGameState.json();

      console.log(`updateGameStateParsed: `, updateGameStateParsed);

      if (newStatus === "Current") {
        this.updateGamePageShowing("GameCurrent");
        this.setState({ongoingGame: true});
      } else if (game.status === "Past") {
        this.updateGamePageShowing("GamesPast");
        this.setState({ongoingGame: false});
      } else {
        this.updateGamePageShowing("Choose");
      }

      console.log(`updateGameStateParsed -> parsed edit: `, updateGameStateParsed);

    } catch(err){
      console.log(err)
    }
  }


  // ------------------------------ CREATE GAME FROM STATE ------------------------------ //
  
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


  // ------------------------------ CURRENTGAME SUBMIT VOTE ------------------------------ //

  handleSubmitVote = async (e) => {
    e.preventDefault();

    console.log(`this.state in handleSubmitVote: `, this.state);

    try {
      // Make a post request to server to create vote
      const createVoteResponse = await fetch('http://localhost:9000/votes', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          voter:   this.state.vote.voter,
          choice:  this.state.vote.choice,
          game:    this.state.currentGame,
          session: this.state.session
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const parsedResponse = await createVoteResponse.json();
      console.log(`parsedResponse from handleSubmitVote() in GameContainer: `, parsedResponse);
      this.votesLeftCalc();

      this.setState({
        disabled: !this.state.disabled,
      });

    } catch(err){
      console.error(`Error: `, err);
    }
  }


  // ------------------------------ CALCULATE VOTES LEFT ------------------------------ //

  votesLeftCalc = async () => {
    try {

      if (this.state.currentGame.rounds.length !== 0) {
        let votesLeft = ((this.state.currentGame.estimators.length) - (this.state.currentGame.rounds[this.state.currentGame.rounds.length-1].votes.length));
        console.log(`votesLeft after vote: `, votesLeft);
        this.setState({votesLeft: votesLeft});
      }

    } catch(err){
      console.log(`Error in votesLeft: \n`, err);
    }
  }  // ------------------------------ GET CHAT ROOMS AND SUBSCRIBE TO ONE ------------------------------ //

  // getRooms = () => {
  //   this.currentUser.getJoinableRooms()
  //   .then(joinableRooms => {
  //     this.setState({
  //       joinableRooms,
  //       joinedRooms: this.currentUser.rooms
  //     })
  //   }).catch(err => console.log(err, 'error on joinable rooms'));
  // }


  // subscribeToRoom = (roomId) => {
  //   this.setState({
  //     messages: []
  //   })
    
  //   this.currentUser.subscribeToRoom({
  //     roomId: roomId,
  //     messageLimit: 100,
  //     hooks: {
  //       onNewMessage: message => {
  //         console.log(message.text);
  //         this.setState({
  //           messages: [...this.state.messages, message]
  //         })
  //       }
  //     }
  //   })
  //   .then(room => {
  //     this.setState({
  //       roomId: room.id
  //     })
  //     this.getRooms()
  //   }).catch(error => console.log(error, 'error subscribing to room'));
  // }

  // ------------------------------ CREATE CHAT ROOM ------------------------------ //

  createRoom = () => {
    this.game.currentUser.createRoom({
      roomId: this.state.game.title
    })
    .then(room => this.subscribeToRoom(room.id))
    //the name of the room above can go into the game creation form. The code above that's commented ensures that once the room is created, we go to it. It will work because the form for game creation will include a spot for room creation, and the button will submit change for both game creation AND making the chat box. 
  }


  componentDidMount(){

    this.getGames().then(parsedResponse => { 

      parsedResponse.data.forEach(game => {

        if (game.status === 'Current') {              // Find the ONE game that is current and set state
          // IMPORTANT
          // IMPORTANT
          // IMPORTANT
          // IMPORTANT

          // && game.scrumMaster._id === parsedResponse.session.userId
          this.setState({
            currentGame: game,
            session: parsedResponse.session
          })
        }
      });
    }).catch((err) => {
      console.error(`Error: `, err);
    })     
  }

    render(){
    console.log(`GameContainer.js pageShowing: `, this.state.pageShowing);
    console.log(`this.state in GameContainer: `, this.state);

      return(
        <div>
        {this.state.pageShowing === "Choose" ? 
          <div>
            <Choose 
            updateGamePageShowing={this.updateGamePageShowing} 
            ongoingGame={this.state.ongoingGame}
            />
          </div> 
          : null}

        {this.state.pageShowing === "GameCreateUserStory" ? 
          <div>
            <GameCreateUserStory 
            updateGamePageShowing={this.updateGamePageShowing} 
            updateUserStory={this.updateUserStory}
            user={this.state.game.scrumMaster}/>
          </div> 
          : null}

        {this.state.pageShowing === "Repos" ? 
          <div>
            <Header as="h2">Repos</Header>
            <Repos updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}

        {this.state.pageShowing === "RepoIssues" ? 
          <div>
            <Header as="h2">RepoIssues</Header>
            <RepoIssues updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}

        {this.state.pageShowing === "GameCreateEstimInvites" ? 
          <div>
            <Header as="h2">Estimator Invites</Header>
            <GameCreateEstimInvites 
            updateGamePageShowing={this.updateGamePageShowing} 
            updateEstimators={this.updateEstimators}
            getUsers={this.getUsers} 
            appState={this.props.appState}/>
          </div> 
          : null}

        {this.state.pageShowing === "GameCreateFinal" ? 
          <div>
            <Header as="h2">Overview</Header>
            <GameCreateFinal 
            updateGamePageShowing={this.updateGamePageShowing} 
            addGame={this.addGame} 
            gameToCreate={this.state.game}/>
          </div> 
          : null}

        {this.state.pageShowing === "GamesPast" ? 
          <div>
            <Header as="h2">GamesPast</Header>
            <GamesPast updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}

        {this.state.pageShowing === "GameCurrent" ? 
          <div>
            <GameCurrent 
              updateGamePageShowing={this.updateGamePageShowing} 
              handleSubmitVote={this.handleSubmitVote}
              handleChange={this.handleChange}
              votesLeft={this.state.votesLeft}
              getGames={this.getGames}
              vote={this.state.vote}
              currentGame={this.state.currentGame}
              disabled={this.state.disabled}
              />
          </div> 
          : null}

        {this.state.pageShowing === "GamesPending" ? 
          <div>
            <GamesPending 
              updateGamePageShowing={this.updateGamePageShowing}
              updateGameStatus={this.updateGameStatus}
              getGames={this.getGames} 
               />
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
