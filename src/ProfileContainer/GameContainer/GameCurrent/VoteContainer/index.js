import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

const votes = [0, .5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

class VoteContainer extends Component {
	constructor(){
		super();
		this.state = {
			vote: {
				voter: '',
				choice: null
			}
		}
	}
	
	render () {
		const mapvotes = votes.map((vote, i) => {
		return(
			<div key={i}>
				<input 
				key={i}
				type="radio"
				id={i}
				value={vote}
				checked={this.props.vote.choice === String(vote)}
				onChange={this.props.handleChange} />
				<label htmlFor={vote}>{vote}</label>
			</div>
		)
	})

		return ( 
			<div>
				{this.props.currentGameState.length !== 0 ?
					<div>
						<h3> Time to Vote! </h3>
						<p> Please pick a number that represents the days you think this feature will take to complete</p>
						<Form onSubmit={this.props.handleSubmitVote}>
							{mapvotes}
							<Button type="submit" disabled={this.props.disabled}>Cast your Vote</Button>
						</Form>
						<Button type="submit" disabled={this.props.votesLeft != 0 ? !this.props.disabled : this.props.disabled}>{this.props.votesLeft} people left to vote</Button>
					</div>
				: <p>No Current Games to Show</p>}
			</div>
		)
	}
}


export default VoteContainer;