import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';

const RoundContainer = (props) => {
	const rounds = props.game.rounds.map((round,i) => {
		return(
				<Table.HeaderCell key={i}>{round} 
				</Table.HeaderCell>
			)
	})
	//Need to compare the user on the table with the vote's user. 
	const user = props.game.estimators.map((estimator, i) => {
		const userVotesPerRound = props.game.rounds.map((round, i) => {
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

export default RoundContainer;
