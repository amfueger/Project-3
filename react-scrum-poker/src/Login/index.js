import React, { Component } from 'react';
import { Form, Button, Label, Segment, Header } from 'semantic-ui-react';
// import gitHubStuff from '../gitHubStuff.js';


class Login extends Component {
	constructor(){
		super();

		this.state = {
			username: '',
			email: '',
			password: '',
			company: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		console.log(`After preventDefault`);
		
		const loginResponse = await fetch('http://localhost:9000/auth/register', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const parsedResponse = await loginResponse.json();

		console.log(`<Login> handleSubmit() parsedResponse`, parsedResponse);

		if(parsedResponse.data === 'login successful'){									// If login success
			//Validation?
			this.props.handleLogin(this.state.username, this.state.company, true);		// Pass data up to App.js
			console.log(`Before this.props.updatePageShowing`);


			
			this.props.updatePageShowing("ProfileContainer");						// Change page showing to the user's profile
			console.log(`After this.props.updatePageShowing`);
			// this.props.history.push('/profile');
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
				<Segment>
					<Header as="h1">Login</Header>
					<Form onSubmit={this.handleSubmit}>
						<small>Also used for your chat handle</small>
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
						type='text' 
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
						color='blue'>Login</Button>
					</Form>
					<br/>
					<br/>
					<Form onSubmit={this.handleSubmitGitHub}>
						<Label> Login With GitHub: </Label><br/>
						<Button type='Submit' color='blue'>Login</Button>
					</Form>
				</Segment>
			</div>
		)
	}
}

export default Login;
