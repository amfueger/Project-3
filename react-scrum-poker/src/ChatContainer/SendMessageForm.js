import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

class SendMessageForm extends Component{
	constructor(){
		super();
		this.state = {
			message: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			message: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.sendMessage(this.state.message)
		this.setState({
			message: ''
		})
	}
	render() {
		return (
			<Form 
				disabled={this.props.disabled}
				onSubmit={this.handleSubmit}
				className="send-message-form">
				<Form.Input 
					onChange={this.handleChange}
					value={this.state.message}
					placeholder="Type here, hit enter"
					type="text" />
			</Form>
			)
	}
}

export default SendMessageForm;