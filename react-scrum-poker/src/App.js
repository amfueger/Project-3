import React, { Component } from 'react';
import './App.css';

// -------------------- Import Components -------------------- //
import InstructionsContainer from './InstructionsContainer';
import NavHeaderNotLogged from './NavHeaderNotLogged';
import ProfileContainer from './ProfileContainer';
import NavHeaderLogged from './NavHeaderLogged';
import GameContainer from './GameContainer';
// import Register from './Register';
// import Repos from './Repos';
import Login from './Login';

// -------------------- Import Modules -------------------- //
import { Route, Switch } from 'react-router-dom';


class App extends Component {
	constructor(){
    super();

    this.state = {
      pageShowing: 'Login',
    	logged: false,
    	username: '',
      company: '',
    	repos: [],
	  }

    this.updatePageShowing = this.updatePageShowing.bind(this);
	}


  handleLogin = (username, company, isLogged) => {
      console.log(`company: `, company);
      console.log(`username: `, username);
      console.log(`isLoggedIn: `, isLogged);
 
      this.setState({
        logged: isLogged,
        username: username,
        company: company
      });
  }

  updatePageShowing = async (pageShowing) => {
    // e.preventDefault();
      console.log(`pageShowing: `, pageShowing);


      await this.setState({pageShowing: pageShowing});
  }
        // <InstructionsContainer />
        // {this.state.logged ? <p>You are logged in</p> : <Login handleLogin={this.handleLogin} />}



  render() {
    return (
      <div className="App">
        {this.state.logged ? <NavHeaderLogged /> : <NavHeaderNotLogged />}
        <Switch>
	        <Route exact path="/" component={ ()=> <InstructionsContainer appState={this.state}/> }/>
	        <Route exact path="/auth/login" component={()=> this.state.logged ? <p>You are logged in</p> : <Login handleLogin={this.handleLogin} appState={this.state}/> }/>
	    		<Route exact path="/profile" component={ ()=> <ProfileContainer appState={this.state}/> }/>
      		<Route exact path="/games" component={()=> <GameContainer appState={this.state}/> } />
      	</Switch>
      

        {this.state.pageShowing === "InstructionsContainer" ? 
          <div>
            <InstructionsContainer updatePageShowing={this.updatePageShowing} appState={this.state}/>
          </div> 
          : null} 
        {this.state.pageShowing === "Login" ? 
          <div>
            <Login updatePageShowing={this.updatePageShowing} handleLogin={this.handleLogin} appState={this.state}/>
          </div> 
          : null} 
        {this.state.pageShowing === "ProfileContainer" ? 
          <div>
            <ProfileContainer updatePageShowing={this.updatePageShowing} appState={this.state}/>
          </div> 
          : null} 
        {this.state.pageShowing === "GameContainer" ? 
          <div>
            <GameContainer updatePageShowing={this.updatePageShowing} appState={this.state}/>
          </div> 
          : null} 
      </div>
    );
  }
}

export default App;
