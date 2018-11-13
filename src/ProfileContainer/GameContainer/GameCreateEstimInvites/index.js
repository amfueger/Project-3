import React, { Component } from 'react';
import { Form, Button, Label, Segment, Divider } from 'semantic-ui-react';
// import serverURL from '../serverURL.js';


class GameCreateEstimInvites extends Component {             // This Component lists all potential estimators 
  constructor(){                                             // i.e. everybody from ghe same company, excluding scrumMaster themselves
    super();                                                 // scrumMaster has option of deleting estimators they do not want participating

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


  // ------------------------------ DELETE UNWANTED ESTIMATORS ------------------------------ //

  deleteEstimator = (e) => {
    e.preventDefault();
    let estimatorsArray = [];

    this.state.estimators.forEach((estimator, i) => {
      if (estimator._id !== e.currentTarget.value && this.state.estimators.length > 1) {
        estimatorsArray.push(estimator);
      }
    });

    this.setState({
      scrumMaster: this.state.scrumMaster,
      estimators: estimatorsArray
    });
  }


  // ------------------------------ GET ESTIMATORS ON INITAL LOAD ------------------------------ //

  componentDidMount(){
    
    this.props.getUsers().then(parsedResponse => {                      

    	let estimatorsArray = [];																         	// Make array that will hold estimators from same company minus logged user
      let scrumMasterGet = null;

    	parsedResponse.data.forEach(elem => {
        if (this.props.appState.username === elem.username) {
          scrumMasterGet = elem;                                        // Grab scrumMaster which will provide company name
        }
    	});

      parsedResponse.data.forEach(elem => {
        if (scrumMasterGet.company === elem.company 
          && scrumMasterGet.username !== elem.username) {
          estimatorsArray.push(elem);                                   // Grab estimators (same company)
        }
      });

      this.setState({
        scrumMaster: scrumMasterGet,
        estimators: estimatorsArray
      })

    }).catch((err) => {
      console.log(err);
    })    
  }


  render(){

  	const estimatorsMapped = this.state.estimators.map((estimator, i) => {
  		return (
  			<div key={estimator._id}>
	        <Label htmlFor="name=username">Estimator Username:</Label>
	        <Form.Input type='text' name='username' value={estimator.username}/>

	        <Label>Estimator Email:</Label>
	        <Form.Input type='text' name='email' value={estimator.email}/>

	        <Button onClick={this.deleteEstimator} value={estimator._id} color="blue" type='Submit'>Delete Estimator</Button>
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
