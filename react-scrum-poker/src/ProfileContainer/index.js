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
    await console.log(`pageShowing: `, pageShowing);

    await this.setState({
    	pageShowing: pageShowing,
    });

  	await console.log(`this.state from updatePageShowing() ProfileContainer: `, this.state);
  }


 // updateUser = () => {
 		
 // }

  componentWillMount = async () => {
 	  await this.setState({
     	username: this.props.appState.username,
      userId: this.props.appState.userId
      // company: this.props.appState.company 	
    });

	await console.log(`this.state from componentWillMount() ProfileContainer: `, this.state);
};

  render(){
    return(
    	<div>
        <Header as="h2">---------- My Profile - ProfileContainer ----------</Header>
        
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

