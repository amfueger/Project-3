import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

const votes = [0, .5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
class VoteContainer extends Component {
	constructor(){
		super();
		this.state = {
			vote: {
				voter: '',
				choice: null
			},
			disabled: false
		}
	}
	// Get the Game's Round's Vote array.
	// Allow user to vote --> goes to the round which has an array of votes
	// 
	handleChange = (e) => {
		console.log(e.currentTarget);
		this.setState({
			vote: {
				voter: this.props.currentGameState.session.userId,
				choice: e.currentTarget.value
			}
		})
	}


	handleSubmit = async (e) => {
		e.preventDefault();
		let roundXVotesArray = [];
		roundXVotesArray.push(this.state.vote);

		console.log(`roundXVotesArray: `, roundXVotesArray);

		try {
			// Make a post request to server to create vote
	    const createVoteResponse = await fetch('http://localhost:9000/votes', {
	    	method: 'POST',
	    	credentials: 'include',
	    	body: JSON.stringify({
	    		voter: this.state.vote.voter,
	    		choice: this.state.vote.choice,
	    		currentGameState: this.props.currentGameState
	    	}),
				headers: {
					'Content-Type': 'application/json'
				}
	    });

			const parsedResponse = await createVoteResponse.json();

			console.log(`<VoteContainer> handleSubmit() parsedResponse: \n`, parsedResponse);


			this.setState({
				disabled: !this.state.disabled
			})
		} catch(err){
			console.error(`Error: `, err);
		}

	}
	
	render () {
		const mapvotes = votes.map((vote, i) => {
		return(
			<div>
				<input 
				key={i}
				type="radio"
				id={i}
				value={vote}
				checked={this.state.vote.choice === String(vote)}
				onChange={this.handleChange} 
				/>
				<label htmlFor={vote}>{vote}</label>
			</div>
			
		)
	})
		console.log(`this.state on render in VoteContainer: `, this.state);
		console.log(`this.props.currentGameState on render in VoteContainer: `, this.props.currentGameState);

		return ( 
			<div>
			<h3> Time to Vote! </h3>
			<p> Please pick a number that represents the days you think this feature will take to complete</p>
			<Form onSubmit={this.handleSubmit}>
				{mapvotes}
			<Button type="submit" disabled={this.state.disabled}>Cast your Vote</Button>
			</Form>
			<Button type="submit" disabled={!this.state.disabled}>... people left to vote</Button>
			</div>
			)
	}
}


export default VoteContainer;

