import React, { Component } from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';


class GamesPending extends Component {
    constructor(){
        super();
        this.state = {
            estimatorGames: [],
            scrumMasterGames: []
        }
    }

  getGames = async () => {
    const games = await fetch('http://localhost:9000/games', {    // Fetch all games
      credentials: 'include'
    }); 	  
    const gamesParsedJSON = await games.json();
    await console.log(`gamesParsedJSON from GamesPending: `, gamesParsedJSON);
    return gamesParsedJSON;
  };

  // updateGameState = async () => {

  // };

  componentDidMount(){
    this.getGames().then(parsedResponse => { 

        const scrumMasterGames = parsedResponse.data.map(game => {
            if (game.scrumMaster.username === parsedResponse.session.username) {
                return (
                    <Segment key={game._id}>
                        <Header as="h3">{game.title}</Header>
                        <p>{game.description}</p>
                        <Button>Join</Button>
                    </Segment>
                ) 
            } else {
                return null;
            }
        });

        let estimatorGames = [];

        parsedResponse.data.forEach(game => {
            game.estimators.forEach(estimator => {
                if (estimator.username === parsedResponse.session.username) {
                    estimatorGames.push(game);
                }
            })
        })

        const estimatorGamesMapped = estimatorGames.map(game => {
            return (
                <Segment key={game._id}>
                    <Header as="h3">{game.title}</Header>
                    <p>{game.description}</p>
                    <Button>Join</Button>
                </Segment>
            ) 
        })

        this.setState({estimatorGames: estimatorGamesMapped, scrumMasterGames: scrumMasterGames})

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
