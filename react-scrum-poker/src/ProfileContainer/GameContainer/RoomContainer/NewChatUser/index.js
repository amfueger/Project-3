import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class NewChatUser extends Component{
	constructor() {
		super();
		this.state = {
			username: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			username: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.handleChange(this.state.username)
	}
//Above handles creating the room, and resets the form's state
	render() {
		return (
			<div className="new-user-form">
				<Form>
					<Form.Input
					onChange={this.handleChange}
					type="text"
					placeholder="User Name"
					required />
					<Button id="create-user-button" type="submit">*</Button>
				</Form>
			</div>
			)
		//Need to ensure that this button is actually used for game creation, not just ROOM creation
	}
}

export default NewChatUser;



//Where the User Form is needed: 
//<NewChatUser onSubmit={this.onUsernameSubmitted} />

//Here is the method that needs to go in the Game Creation container:

//make sure to set state for currentUsername in constructor
/* 
onUsernameSubmitted = (username) { 
fetch('http://localhost:9000/chatusers', {
	method: 'POST',
	headers: {
	'Content-Type': 'application/json',
	},
	body: JSON.stringify({ username })
})
	.then(response => {
		this.setState({
		currentUsername: username
	})
})
}
*/