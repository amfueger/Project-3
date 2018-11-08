import React, { Component } from 'react';


class GamesPending extends Component {

  getGames = async () => {
    const estimators = await fetch('http://localhost:9000/games/', {    // Fetch all games
      credentials: 'include'
    }); 	  
    const estimatorsParsedJSON = await estimators.json();
    await console.log(`estimatorsParsedJSON from GamesPending: `, estimatorsParsedJSON);
    return estimatorsParsedJSON;
  };


  componentDidMount(){
    
    this.getGames()
    // .then(parsedResponse => {                            // Get ALL Games


    //   this.setState({
    //     scrumMaster: scrumMasterGet,
    //     estimators: estimatorsArray
    //   })
    //   console.log(`this.state from componentDidMount() GameCreateEstimInvites: `, this.state);	

    // }).catch((err) => {
    //   console.log(err);
    // })    
  };

    render(){
        return(
            <div>GamesPending</div>
        )
    }
}
export default GamesPending;
