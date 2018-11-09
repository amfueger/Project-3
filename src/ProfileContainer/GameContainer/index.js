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
      game : {
        title: '',
        description: '',
        scrumMaster: [],
        estimators: [],
        status: 'Pending',
        roomId: '',
        currentUser: ''
      }
    }
    // this.updateGamePageShowing = this.updateGamePageShowing.bind(this);
  }

  updateGamePageShowing = async (pageShowing) => {
      this.setState({pageShowing: pageShowing});
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
      console.log(`currentUser inside Chatmanager updateEstimators(): `, chatManagerResponse);

      this.setState({
        game: {
          title: this.state.game.title,
          description: this.state.game.description,
          estimators: data.estimators,
          scrumMaster: data.scrumMaster,
          status: 'Pending',
          currentUser: chatManagerResponse

        }
      });
    })
    .catch(err => console.log('err on connecting', err));



    } catch(err){
      console.error(`Error in updateEstimators() GameContainer`, err);
    }
  }

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


  // createRoom = (name) => {
  //   this.currentUser.createRoom({
  //     name
  //   })
  //   //.then(room => this.subscribeToRoom(room.id))
  //   //the name of the room above can go into the game creation form. The code above that's commented ensures that once the room is created, we go to it. It will work because the form for game creation will include a spot for room creation, and the button will submit change for both game creation AND making the chat box. 
  // }

  
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


  updateGameStatus = async (game, status) => {
    // e.preventDefault();

    try {

      const updateGameState = await fetch('http://localhost:9000/games/' + game._id, {
        method: 'PUT',
        body: JSON.stringify({
          ...game,
          status: status
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const updateGameStateParsed = await updateGameState.json();

      console.log(`updateGameStateParsed: `, updateGameStateParsed);

      // this.setState({
      //   showEditModal: false,
      //   movies: newMovieArrayWithEdit
      // });
      if (game.status === "Current") {
        this.updateGamePageShowing("GameCurrent");
      } else if (game.status === "Past") {
        this.updateGamePageShowing("GamesPast");
      } else {
        this.updateGamePageShowing("Choose");
      }

      console.log(`updateGameStateParsed -> parsed edit: `, updateGameStateParsed);

    } catch(err){
      console.log(err)
    }
    

  };


    render(){
    console.log(`GameContainer.js pageShowing: `, this.state.pageShowing);
      return(
        <fieldset>
        <legend as="h1">Games</legend>
        
        {this.state.pageShowing === "Choose" ? 
          <div>
            <Choose 
            updateGamePageShowing={this.updateGamePageShowing} 
            />
          </div> 
          : null}

        {this.state.pageShowing === "GameCreateUserStory" ? 
          <div>
            <GameCreateUserStory 
            updateGamePageShowing={this.updateGamePageShowing} 
            updateUserStory={this.updateUserStory}/>
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
            <GameCurrent updateGamePageShowing={this.updateGamePageShowing} />
          </div> 
          : null}

        {this.state.pageShowing === "GamesPending" ? 
          <div>
            <GamesPending 
              updateGamePageShowing={this.updateGamePageShowing}
              updateGameStatus={this.updateGameStatus} />
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
