import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';

class NavHeaderLogged extends Component {

	handleLogout = async () => {
	    try {
	      const logoutRequest = await fetch('http://localhost:9000/auth/logout', {
	        credentials: 'include'
	      });

	      const parsedResponse = await logoutRequest.json();

	      await console.log(`parsedResponse from Logout: `, parsedResponse);

	      await this.props.updatePageShowing('Login');

	      // return parsedResponse;

	    } catch(err){
	        console.log('Error: ', err);
	    }
  	}

	render(){
	return(
		<Header>
			<Menu>
				<Menu.Item onClick={() => this.props.updatePageShowing("InstructionsContainer")}>
			    	Home
				</Menu.Item>

				<Menu.Item onClick={() => this.props.updatePageShowing("ProfileContainer")}>
					My Profile
				</Menu.Item>

				<Menu.Item onClick={this.handleLogout}>
					Logout
				</Menu.Item>
			</Menu>
		</Header>
		)
	}
}

export default NavHeaderLogged;