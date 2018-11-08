import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import GameContainer from './GameContainer';
import ProfileEdit from './ProfileEdit';

class ProfileContainer extends Component {

	constructor(){
    super();

    this.state = {
      pageShowing: 'GameContainer',
      username: '',
      userId: '',
      company: ''
    }
	}

  updatePageShowing = async (pageShowing) => {
    this.setState({
    	pageShowing: pageShowing,
    });
  }


 // updateUser = () => {
 		
 // }


  componentWillMount = async () => {
 	  this.setState({
     	username: this.props.appState.username,
      userId: this.props.appState.userId
      // company: this.props.appState.company 	
    });
};

  render(){
    return(
    	<div>
        <Header as="h1">User Profile: {this.state.username}</Header>
        
        {this.state.pageShowing === "GameContainer" ? 
	        <div>
	          <GameContainer 
	          updatePageShowing={this.updatePageShowing} 
	          appState={this.state}/>
	        </div> 
	        : null
	      }

        {this.state.pageShowing === "ProfileEdit" ? 
	        <div>
	          <ProfileEdit 
	          updatePageShowing={this.updatePageShowing} 
	          appState={this.state}/>
	        </div> 
	        : null
	      }

		</div>
    )
  }
}


export default ProfileContainer;

