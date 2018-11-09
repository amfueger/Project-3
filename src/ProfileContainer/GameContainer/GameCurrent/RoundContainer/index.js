import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';

class RoundContainer extends Component {
	constructor() {
		super();

		this.state = {
			game: null
		}
	}
	;
	//fetch route fetch get games/:id 
	// this.props.game._id <--- put this inside the fetch route. 
	//Store everything in the constructor
	//Whatever that game is .rounds go to the first round, see all the 

	getGame = async () => {
		console.log(this.props.game._id, "this.props.game._id before game fetch");
		const getGame = await fetch('http://localhost:9000/games/' + this.props.game._id , {
			credentials: 'include'
		})
		const gameParsedJson = await getGame.json();
		return gameParsedJson
	}

	componentDidMount(){
		this.getGame().then((game) => {
			console.log('getting gameParsedJson in componentDidMount RoundContainer', game);
		this.setState({
			game: game
			})
		})
	}	

	render() {
	const currentGame = this.state.game; 
	console.log("set the state of the game", this.state);
	const rounds = currentGame.rounds.map((round,i) => {
		return(
				<Table.HeaderCell key={i}>{round} 
				</Table.HeaderCell>
			)
	})
	//Need to compare the user on the table with the vote's user. 
	const user = currentGame.estimators.map((estimator, i) => {
		const userVotesPerRound = currentGame.rounds.map((round, i) => {
			for(let i = 0; i < round.votes.length; i++) {
				if(round.votes[i].voter === estimator) {
					return <Table.Cell>round.votes[i].choice</Table.Cell>
				}
			} return <Table.Cell>'current'</Table.Cell>;
		})

		return(
			<Table.Row>
				<Table.Cell>
					<Header key={i}>{estimator}</Header>
				</Table.Cell>
				{userVotesPerRound}
				</Table.Row>
			)
	})
	return (
	<Table basic='very' celled collapsing>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Name</Table.HeaderCell>
				{rounds}
			</Table.Row>
		</Table.Header>
				<Table.Body>
				{user}
				</Table.Body>
	</Table>
		)
		
	}
	
	
}

export default RoundContainer;
