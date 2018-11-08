import React, { Component } from 'react';
import { Form, Button, Label, Segment, Header } from 'semantic-ui-react';


class Login extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		
		const loginResponse = await fetch('http://localhost:9000/auth/login', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const parsedResponse = await loginResponse.json();

		console.log(`<Login> handleSubmit() parsedResponse`, parsedResponse);

		if(parsedResponse.data === 'Login Successful'){									// If login success
			//Validation?
			this.props.handleLogin(this.state.username, this.state.company, true);		// Pass data up to App.js
			
			this.props.updatePageShowing("ProfileContainer");								// Change page showing to the user's profile
			// this.props.history.push('/profile');
		}
	}	
    render(){
        return(
			<div>
				<Segment>
					<Header as="h1">Login</Header>
					<Form onSubmit={this.handleSubmit}>

						<Label> Username: </Label><br />
						<Form.Input 
						type='text' 
						name='username' 
						placeholder='username'
						onChange={this.handleChange}
						required />
						
						<Label> Password: </Label>
						<Form.Input 
						type='password' 
						name='password'
						placeholder='password' 
						onChange={this.handleChange} 
						required />
						
						<Button 
						type='Submit' 
						color='blue'>Login</Button>

					</Form>
					<br/>
					<br/>
					<Form onSubmit={this.handleSubmitGitHub}>
						<Button type='Submit' color='black'>Login with GitHub</Button>
					</Form>
				</Segment>
			</div>
        )
    }
}
export default Login;
