import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';


class GameCreateEstimInvites extends Component {
  constructor(){
    super();

    this.state = {
    	scrumMaster: {

    	},
    	estimators: [],
      username: '',
      email: ''
    }
  }


  updateEstimators = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }


  getPotentialEstimators = async () => {
    const estimators = await fetch('http://localhost:9000/users/'); 	// Fetch all users
    const estimatorsParsedJSON = await estimators.json();
    await console.log(`estimatorsParsedJSON: `, estimatorsParsedJSON);
    return estimatorsParsedJSON;
  }


  componentDidMount(){
    // Get ALL potential estimators, on the intial load of the APP
    this.getPotentialEstimators().then((parsedResponse) => {

    	let estimatorsArray = []																	// Make array that will hold estimators from same company - logged user

    	parsedResponse.data.forEach(elem => {
		    if (this.props.loggedUser.company === elem.company && this.props.loggedUser.username !== elem.username){
		    	estimatorsArray.push(elem);
		    }
    	})

      this.setState({estimators: estimatorsArray})	

    }).catch((err) => {
      console.log(err);
    })

    
  }  

  render(){

  	const estimatorsMapped = this.state.estimators.map((estimator, i) => {
  		return (
  			<div key={estimator._id}>
	        <Label htmlFor="name=username">Estimator Username:</Label>
	        <Form.Input type='text' name='username' value={estimator.username} onChange={this.updateMovie}/>

	        <Label>Estimator Email:</Label>
	        <Form.Input type='text' name='email' value={estimator.email} onChange={this.updateMovie}/>

	        <Button color="blue" type='Submit'>Delete Estimator</Button>
        </div>
			)
  	})

    return(
	    <div>
	      <Segment>
	      	<h3>Estimator Invites</h3>
	        <Form onSubmit={this.props.updateEstimators.bind(null, this.state)}>
	        	{estimatorsMapped}
	        </Form>
	      </Segment>
	    </div>             
    )
  }
}
export default GameCreateEstimInvites;
