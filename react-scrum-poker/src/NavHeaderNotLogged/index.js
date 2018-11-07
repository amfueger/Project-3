import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavHeaderNotLogged extends Component {
	state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render(){
	  const { activeItem } = this.state;
		return(
			<Header>
				<Menu>
					<Menu.Item as={ Link } name='profile' to='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
					  My Profile
					</Menu.Item>

					<Menu.Item as={ Link } name='login' to='auth/login' active={activeItem === 'login'} onClick={this.handleItemClick}>
						Login
					</Menu.Item>

					<Menu.Item as={ Link } name='register' to='register' active={activeItem === 'register'} onClick={this.handleItemClick} >
						Register
					</Menu.Item>
				</Menu>
			</Header>
		)
	}
}

export default NavHeaderNotLogged;