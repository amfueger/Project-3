import React, { Component } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
// import serverURL from './serverURL.js';


class GamesPending extends Component {
  constructor(){
    super();
    this.state = {
        estimatorGames: [],
        scrumMasterGames: []
    }
  }

  componentDidMount(){

    this.props.getGames().then(parsedResponse => { 

      // ------------------------------ GET/MAP GAMES WHERE USER IS SCRUMMASTER ------------------------------ //

      const scrumMasterGames = parsedResponse.data.map(game => {
        if (game.scrumMaster.username === parsedResponse.session.username && game.status === "Pending") {
          return (
            <Segment key={game._id}>
                <Header as="h3">{game.title}</Header>
                <p>{game.description}</p>
                <Button onClick={() => this.props.updateGameStatus(game, "Current")}>Join</Button>
            </Segment>
          ) 
        } else {
            return null;
        }
      });

      // ------------------------------ GET/MAP GAMES WHERE USER IS ESTIMATOR ------------------------------ //

      let estimatorGames = [];

      parsedResponse.data.forEach(game => {
        game.estimators.forEach(estimator => {
          if (estimator.username === parsedResponse.session.username && game.status === "Pending") {
              estimatorGames.push(game);
          }
        })
      })

      const estimatorGamesMapped = estimatorGames.map(game => {
        return (
          <Segment key={game._id}>
            <Header as="h3">{game.title}</Header>
            <p>{game.description}</p>
            <Button 
                onClick={() => {this.props.updateGameStatus(game, "Current")}}
            >Join</Button>
          </Segment>
        ) 
      })

      // ------------------------------ SET STATE TO RENDER ------------------------------ //

      this.setState({
        estimatorGames: estimatorGamesMapped, 
        scrumMasterGames: scrumMasterGames
      })

    }).catch((err) => {
      console.error(`Error: `, err);
    })    
  }

  render(){
    return(
      <div>
      <Header as="h1">GamesPending</Header>
      <Header as="h2">Games as Scrum Master:</Header>
      {this.state.scrumMasterGames}
      <Header as="h2">Games as Estimator:</Header>
      {this.state.estimatorGames}
      </div>
    )
  }
}

export default GamesPending;
