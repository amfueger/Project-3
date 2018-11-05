import React, { Component } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { Switch, Route, Link } from 'react-router-dom';

class NavHeaderLogged extends Component {
	state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render(){
	  const { activeItem } = this.state;
	return(
		<Header>
			<Menu>
				<Menu.Item
					name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
			  >
			    Home
				</Menu.Item>

				<Menu.Item
					as={ Link }
					name='profile'
					to='profile'
				>
					My Profile
				</Menu.Item>
				<Menu.Item
					name='logout'
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}
				>
					Logout
				</Menu.Item>
			</Menu>
		</Header>
		)
}

export default NavHeaderLogged;