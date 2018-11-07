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

	export default NewChatUser
}