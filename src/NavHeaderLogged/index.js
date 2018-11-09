import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import serverURL from '../serverURL.js';

class NavHeaderLogged extends Component {

	handleLogout = async () => {
	    try {
	      const logoutRequest = await fetch(serverURL + 'auth/logout', {
	        credentials: 'include'
	      });

	      const parsedResponse = await logoutRequest.json();

	      console.log(`parsedResponse from Logout: `, parsedResponse);

	      this.props.updatePageShowing('Login');

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