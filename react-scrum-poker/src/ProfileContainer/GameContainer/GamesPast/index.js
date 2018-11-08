import React from 'react';
import { Card } from 'semantic-ui-react';

const GamesPast = (props) => {
	const games = props.games.map((game, i) => {
		return(
			//Need if statement for active: false. There is a route for it. It is /complete/:id
			<Card key={i}>
				<Card.Content>
					<Card.Header>{game.title}</Card.Header>
					<Card.Description>{game.issue} + " with a result of " {game.result} </Card.Description>
				</Card.Content>
			</Card>
			)
	})
	return(
		<div>
			<h3>Past Games</h3>
				<Card.Group>
					{games}
				</Card.Group>
		</div>
		)
	}

export default GamesPast;
