import React, { Component } from 'react';
import { Form, Button, Segment, Header, Input, Divider } from 'semantic-ui-react';


class GameCreateFinal extends Component {

    render(){

    	console.log(`this.props.gameToCreate: `, this.props.gameToCreate);
    	const estimators = this.props.gameToCreate.estimators.map(estimator => {
	  		return (
	  			<div key={estimator._id}>
		        <Input label="Username:" type='text' name='username' value={estimator.username}/>
		        <Input label="Email:" type='text' name='email' value={estimator.email}/>
	        </div>
			)
    	})

        return(
        	<Segment>
	        	<Header as="h1">GameCreateFinal</Header>

	        	<Form onSubmit={this.props.addGame.bind(null, this.props.gameToCreate)}>
		        	<Header as="h4">User Story</Header>
			        <Input label="Title:" type='text' name='title' value={this.props.gameToCreate.title}/>
			        <Input label="Description:" type='text' name='description' value={this.props.gameToCreate.description}/>
			        <Divider />
	        		<Header as="h4">Estimators:</Header>
	        		{estimators}
			        <Divider />
			        <Button/>
	        	</Form>
        		
        	</Segment>
            
        )
    }
}
export default GameCreateFinal;
