import React, { Component } from 'react';
import './App.css';
import InstructionsContainer from './InstructionsContainer';
import NavHeaderNotLogged from './NavHeaderNotLogged';
import NavHeaderLogged from './NavHeaderLogged';
import ProfileContainer from './ProfileContainer';
import GameContainer from './GameContainer';
// import Repos from './Repos';
import Login from './Login';
// import Register from './Register';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
	constructor(){
    super();

    this.state = {
    	logged: false,
    	username: '',
    	repos: [],
	    }
	}

	handleLogin = (username, isLogged) => {
      console.log(`username: `, username);
      console.log(`isLoggedIn: `, isLogged);

      this.setState({
      	logged: isLogged,
      	username: username
      });
	}
        // <InstructionsContainer />

  render() {
    return (
      <div className="App">
        {this.state.logged ? <NavHeaderLogged /> : <NavHeaderNotLogged />}
        {this.state.logged ? <p>You are logged in</p> : <Login handleLogin={this.handleLogin} />}
      	<Switch>
	        <Route exact path="/" component={ InstructionsContainer }/>
	        <Route exact path="/auth/login" component={ Login }/>
	    		<Route exact path="/profile" component={ ProfileContainer }/>
      		<Route exact path="/games" component={ GameContainer }/>
      	</Switch>
      </div>
    );
  }
}

export default App;
