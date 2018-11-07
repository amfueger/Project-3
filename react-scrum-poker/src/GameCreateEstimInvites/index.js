import React, { Component } from 'react';
import { Form, Button, Label, Segment, Divider } from 'semantic-ui-react';


class GameCreateEstimInvites extends Component {
  constructor(){
    super();

    this.state = {
      scrumMaster: null,
    	estimators: [],
      username: '',
      email: '',
      disabled: true
    }
  }

  handleClick = () => this.setState({                                   // Button disable/enable
    disabled: !this.state.disabled
  })


  getUsers = async () => {
    const estimators = await fetch('http://localhost:9000/users/'); 	  // Fetch all users
    const estimatorsParsedJSON = await estimators.json();
    await console.log(`estimatorsParsedJSON: `, estimatorsParsedJSON);
    return estimatorsParsedJSON;
  };


  componentDidMount(){
    
    this.getUsers().then(parsedResponse => {                            // Get ALL potential estimators, on the intial load of the APP

    	let estimatorsArray = [];																         	// Make array that will hold estimators from same company minus logged user
      let scrumMasterGet = null;

    	parsedResponse.data.forEach(elem => {
		    if (this.props.appState.company === elem.company 
          && this.props.appState.username !== elem.username){
		    	estimatorsArray.push(elem);                                   // Grab estimators (same company)
		    } else if (this.props.appState.username === elem.username){
          scrumMasterGet = elem;                                        // Grab scrumMaster
          console.log(`scrumMasterGet: `, scrumMasterGet);
          console.log(`elem: `, elem);
        }
    	})

      this.setState({
        scrumMaster: scrumMasterGet,
        estimators: estimatorsArray
      })
      console.log(`this.state from componentDidMount() GameCreateEstimInvites: `, this.state);	

    }).catch((err) => {
      console.log(err);
    })    
  };

  render(){

  	const estimatorsMapped = this.state.estimators.map((estimator, i) => {
  		return (
  			<div key={estimator._id}>
	        <Label htmlFor="name=username">Estimator Username:</Label>
	        <Form.Input type='text' name='username' value={estimator.username}/>

	        <Label>Estimator Email:</Label>
	        <Form.Input type='text' name='email' value={estimator.email}/>

	        <Button color="blue" type='Submit'>Delete Estimator</Button>
        </div>
			)
  	})

    const disabled = this.state.disabled;

    return(
	    <div>
	      <Segment>
          <h1>Create Game</h1>
	      	<h2>Estimator Invites</h2>
	        <Form onSubmit={this.props.updateEstimators.bind(null, this.state)}>
	        	{estimatorsMapped}
            <Divider horizontal></Divider>
	        	<Button onClick={this.handleClick} 
              color="green" 
              type='Submit'
            >
              I've Chosen My Estimators
            </Button>
            <Button onClick={() => this.props.updateGamePageShowing("GameCreateFinal")} 
              disabled={disabled} 
              color="green"
              floated="right" 
            >
              Review and Submit
            </Button>
          </Form>
	      </Segment>
	    </div>             
    )
  }
}
export default GameCreateEstimInvites;
