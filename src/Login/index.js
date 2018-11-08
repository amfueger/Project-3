import React, { Component } from 'react';
import { Form, Button, Segment, Header, Message } from 'semantic-ui-react';
// import serverURL from './serverURL.js';


class Login extends Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
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

			this.props.handleRegisterLogin(														// Pass data up to App.js
				parsedResponse.session.username, 
				parsedResponse.session.userId, 
				parsedResponse.session.logged
			);				
			this.props.updatePageShowing("ProfileContainer");								// Change page showing to the user's profile
			// this.props.history.push('/profile');
		} else {
			this.messageHidden();
		}
	}	
	
    render(){
        return(
			<div>
				<Segment style={{textAlign: 'left'}}>

				    <Button floated="right" color="green" onClick={() => this.props.updatePageShowing("Register")}>
				      <small>Not a member yet?</small><br/>
				      Register
				    </Button>					

				    <Header as="h1">Login</Header>
					<Form onSubmit={this.handleSubmit}>

						<Message hidden={this.state.hidden}>
							Invalid Password/Username (Case Sensitive)
						</Message>

						<Form.Input 
						type='text' 
						name='username' 
						placeholder='username'
						onChange={this.handleChange}
						required />
						
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
