import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class NewRoomForm extends Component{
	constructor() {
		super();
		this.state = {
			roomName: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			roomName: e.target.value
		})
	}
//changes the roomname to whatever value is entered. 
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.createRoom(this.state.roomName)
		this.setState({
			roomName: ''
		})
	}
//Above handles creating the room, and resets the form's state
	render() {
		return (
			<div className="new-room-form">
				<Form>
					<Form.Input
					value={this.state.roomName}
					onChange={this.handleChange}
					type="text"
					placeholder="New Game Chat"
					required />
					<Button id="create-room-button" type="submit">*</Button>
				</Form>
			</div>
			)
		//Need to ensure that this button is actually used for game creation, not just ROOM creation
	}
}