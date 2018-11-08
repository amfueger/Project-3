import React, { Component } from 'react';
import './App.css';

// -------------------- Import Components -------------------- //
import InstructionsContainer from './InstructionsContainer';
import NavHeaderNotLogged from './NavHeaderNotLogged';
import ProfileContainer from './ProfileContainer';
import NavHeaderLogged from './NavHeaderLogged';
import Register from './Register';
// import Repos from './Repos';
import Login from './Login';

// -------------------- Import Modules -------------------- //
// import { Route, Switch } from 'react-router-dom';


class App extends Component {
	constructor(){
    super();

    this.state = {
      pageShowing: 'Register',
    	logged: false,
    	username: '',
      userId: '',
      company: '',
    	repos: [],
	  }

    this.updatePageShowing = this.updatePageShowing.bind(this);
	}


  handleRegisterLogin = (username, userId, isLogged) => {
 
    this.setState({
      username: username,
      userId: userId,
      logged: isLogged
    });
  }


  updatePageShowing = async (pageShowing) => {
    this.setState({pageShowing: pageShowing});
  }


  onUsernameSubmitted = (username) => {
    fetch('http://localhost:9000/chatusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    }).then(response => {
      this.setState({
        username:username
      })
    })
  }

        // <Switch>
        //   <Route 
        //   exact path="/" 
        //   component={ ()=> 
        //     <InstructionsContainer 
        //     appState={this.state}/> }/>
        //   <Route 
        //   exact path="/auth/login" 
        //   component={()=> this.state.logged ? <p>You are logged in</p> : 
        //     <Register
        //     handleRegisterLogin={this.handleRegisterLogin} 
        //     appState={this.state}/> }/>
        //   <Route exact path="/profile" 
        //   component={ ()=> 
        //     <ProfileContainer 
        //     appState={this.state}/> }/>
        // </Switch>


  render() {

    console.log(`App.js pageShowing: `, this.state.pageShowing);

    return (
      <div className="App">

        {this.state.logged ? 
          <NavHeaderLogged updatePageShowing={this.updatePageShowing}/> 
          : <NavHeaderNotLogged updatePageShowing={this.updatePageShowing}/>}

        {this.state.pageShowing === "InstructionsContainer" ? 
          <div>
            <InstructionsContainer 
            updatePageShowing={this.updatePageShowing} 
            appState={this.state}/>
          </div> 
          : null}

        {this.state.pageShowing === "Register" ? 
          <div>
            <Register 
            updatePageShowing={this.updatePageShowing} 
            handleRegisterLogin={this.handleRegisterLogin} 
            appState={this.state}/>
          </div> 
          : null} 

        {this.state.pageShowing === "Login" ? 
          <div>
            <Login 
            updatePageShowing={this.updatePageShowing} 
            handleRegisterLogin={this.handleRegisterLogin} 
            appState={this.state}/>
          </div> 
          : null} 

        {this.state.pageShowing === "ProfileContainer" ? 
          <div>
            <ProfileContainer 
            updatePageShowing={this.updatePageShowing} 
            appState={this.state}/>
          </div> 
          : null} 
      </div>
    );
  }
}


export default App;
