import React, { Component } from 'react';
import { Form, Checkbox, Button } from 'semantic-ui-react';

const votes = [0, .5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
class VoteContainer extends Component {
	constructor(){
		super();
		this.state = {
			roundvotes: [],
			uservote: null
		}
	}
	// Get the Game's Round's Vote array.
	// Allow user to vote --> goes to the round which has an array of votes
	// 
	handleChange = (e) => {
		this.setState({
			uservote: e.currentTarget.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			roundvotes: [...this.props.game.rounds.votes.choice, e.currentTarget.value]
		})
	}
	
	render () {
		const mapvotes = votes.map((vote, i) => {
		return(
			
				<Form.Field key={i}>
					<Checkbox
					radio
					label={vote}
					name='checkboxvote'
					value={vote}
					onChange={this.handleChange} 
					/>
				</Form.Field>
			
		)
	})
		return ( 
			<div>
			<h3> Time to Vote! </h3>
			<p> Please pick a number that represents the days you think this feature will take to complete</p>
			<Form onSubmit={this.handleSubmit}>
				{mapvotes}
			<Button type="submit">Cast your Vote</Button>
			</Form>
			</div>
			)
	}
}


export default VoteContainer;

