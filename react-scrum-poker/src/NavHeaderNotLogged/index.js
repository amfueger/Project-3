import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';

class NavHeaderNotLogged extends Component {

	render(){
		return(
			<Header>
				<Menu>
				<Menu.Item onClick={() => this.props.updatePageShowing("InstructionsContainer")}>
			    	Home
				</Menu.Item>

				<Menu.Item onClick={() => this.props.updatePageShowing("Login")}>
					Login
				</Menu.Item>

				<Menu.Item onClick={() => this.props.updatePageShowing("Register")}>
					Register
				</Menu.Item>
				</Menu>
			</Header>
		)
	}
}

export default NavHeaderNotLogged;