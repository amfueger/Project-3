import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';


class RepoIssues extends Component {

	constructor(){
    super();

    this.state = {
      issues: [],                             // Fetched from GitHub
      issueName: '',                          // Set in handleClick
      issueChosen: []                         // Set in handleClick - Will be used in Create Game
    }
	}

  handleClick = async (e, data) => {
    e.preventDefault();
    try {
      let issueChosen = [];
      
      this.state.issues.forEach(issue => {    // Look through all issues
        if (issue.title === data.value){      // If issue matches picked
          issueChosen.push(issue);            // Push entire issue to array
        }
      });
  
      await this.setState({                     
        issueName: data.value,                // Set issueName in state to selected issue name
        issueChosen: issueChosen              // Set issueChosen in state to entire issue selected
      }); 

      console.log(`this.state: `, this.state);
      
    } catch(err){
        console.log(err);
    }
  }

  getIssues = async (e) => {                  // Get logged user's repos and corresponding issues

    try {
      const issues     = await fetch('https://api.github.com/repos/' + this.props.username + '/' + this.props.repoName + '/issues');
      const issuesJson = await issues.json();
      return issuesJson;

    } catch(err){
      console.log(`Error in getIssues() => catch(err){}\n`, err);
      return err;
    }
  }

  componentDidMount(){
    this.getIssues().then(data => {

      this.setState({issues: data});          // Store all issues' fetched data in state

    }).catch(err => {
      console.log(`Error in componentDidMountRepoIssues .catch(err){}\n`, err);     
    })
  }

  render(){

  	const RepoIssuesList = this.state.issues.map((issue, i) => {
  		return <Dropdown.Item text={issue.title} key={issue.id} value={issue.title} onClick={this.handleClick}/>

  	})

    return(
        <div>
          <h2>GitHub User {this.props.repoName} Issues</h2>
	        <Dropdown placeholder='Select Issue' fluid selection options={RepoIssuesList} text={this.state.issueName}/>
	      </div>  
    )
  }
}
export default RepoIssues;
