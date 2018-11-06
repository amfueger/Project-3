import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavHeaderLogged extends Component {
	state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render(){
	  const { activeItem } = this.state;
	return(
		<Header>
			<Menu>
				<Menu.Item as={ Link } name='home' to='/' active={activeItem === 'home'} onClick={this.handleItemClick}>
			    Home
				</Menu.Item>

				<Menu.Item as={ Link } name='profile' to='/profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
					My Profile
				</Menu.Item>

				<Menu.Item as={ Link } name='logout' to='/logout' active={activeItem === 'logout'} onClick={this.handleItemClick}>
					Logout
				</Menu.Item>
			</Menu>
		</Header>
		)
	}
}

export default NavHeaderLogged;