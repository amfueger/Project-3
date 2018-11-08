import React, { Component } from 'react';
import { Form, Button, Segment, Header, Message } from 'semantic-ui-react';
// import gitHubStuff from '../gitHubStuff.js';


class Register extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			email: '',
			password: '',
			company: '',
			hidden: true
		}
	}

	messageHidden = () => this.setState({
		hidden: !this.state.hidden
	})

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = async (e) => {
		console.log('e, before prevent default: ', e);
		e.preventDefault();
		console.log(`After preventDefault`);
		
		const registerResponse = await fetch('http://localhost:9000/auth/register', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const parsedResponse = await registerResponse.json();

		console.log(`<Register> handleSubmit() parsedResponse`, parsedResponse);

		if (parsedResponse.data === 'Register Successful') {								// If register success
			this.props.handleRegisterLogin(														// Pass data up to App.js
				parsedResponse.session.username, 
				// parsedResponse.session.company, 
				parsedResponse.session.userId, 
				parsedResponse.session.logged
			);		
			
			this.props.updatePageShowing("ProfileContainer");								// Change page showing to the user's profile
			// this.props.history.push('/profile');
		} else {
			this.messageHidden();
		}
	}

	// handleSubmitGitHub = async (e) => {
	// 	e.preventDefault();
	// 	console.log(`after preventDefault`);
	// 	const goToGitHubLoginResponse = await fetch('https://github.com/login/oauth/authorize?client_id=' + gitHubStuff.client_id);
	// 	// 	, {
	// 	// 	mode: 'no-cors',
	// 	// 	// client_id: gitHubStuff.client_id,
	// 	// 	redirect_uri: 'http://localhost:9000/auth/register',
	// 	// 	headers: {
	// 	// 		'Access-Control-Allow-Origin': 'http://localhost:9000/auth/register'
	// 	// 	}
	// 	// }
	// 	console.log(`after goToGitHubLoginResponse`, goToGitHubLoginResponse);
	// 	const parsedResponse = await goToGitHubLoginResponse.json();

	// 	console.log(`<Login> handleSubmitGitHub() parsedResponse`, parsedResponse);

	// 	if(parsedResponse.data === 'login successful'){
	// 		this.props.history.push('/profile');
	// 		// Validation?
	// 		this.props.handleLogin(this.state.username, true);
	// 	}
	// }

	render(){
		// console.log(`gitHubStuff: `, gitHubStuff);
		return(
			<div>
				<Segment style={{textAlign: 'left'}}>

				    <Button floated="right" color="green" onClick={() => this.props.updatePageShowing("Login")}>
				      <small>Already a member?</small><br/>
				      Login
				    </Button>

					<Header as="h1" style={{textAlign: 'left'}}>Register</Header>
					<Form onSubmit={this.handleSubmit}>
						<small>Also used for your chat handle</small>
						<Message hidden={this.state.hidden}>
							Username already taken
						</Message>

						<Form.Input 
						type='text' 
						name='username' 
						placeholder='username'
						onChange={this.handleChange}
						required />

						<Form.Input 
						type='text' 
						name='email' 
						placeholder='email'
						onChange={this.handleChange} 
						required />

						<Form.Input 
						type='password' 
						name='password'
						placeholder='password' 
						onChange={this.handleChange} 
						required />

						<Form.Input 
						type='text' 
						name='company' 
						placeholder='company'
						onChange={this.handleChange} 
						required />

						<Button 
						type='Submit' 
						color='blue'>Register</Button>
					</Form>
					<br/>
					<br/>
					<Form onSubmit={this.handleSubmitGitHub}>
						<Button type='Submit' color='black'>Register with GitHub</Button>
					</Form>
				</Segment>
			</div>
		)
	}
}

export default Register;