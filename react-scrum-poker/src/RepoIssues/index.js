import React, { Component } from 'react';
// import { Dropdown } from 'semantic-ui-react';


class RepoIssues extends Component {

	constructor(){
    super();

    this.state = {
      issues: [],
      issueName: ''
    }
	}

  handleClick = (e, data) => {
    e.preventDefault();
    this.setState({             // Set repoName to selected repo's name
      issueName: data.value
    });
  }

  getIssues = async (e) => {

    try {
      const issues     = await fetch('https://api.github.com/repos/' + this.props.username +'/'+ this.props.repoName + '/issues');
      const issuesJson = await issues.json();
      return issuesJson;

    } catch(err){
      console.log(`Error in getIssues() => catch(err){}\n`, err);
      return err;
    }
  }

  componentDidMount(){
    this.getIssues().then(data => {

    console.log(`repos data from componentDidMountRepoIssues: `, data);
    this.setState({issues: data});

    }).catch(err => {
      console.log(`Error in componentDidMountRepoIssues .catch(err){}\n`, err);     
    })
  }

  render(){

  	// const RepoIssuesList = this.state.issues.map((issue, i) => {
  	// 	return <Dropdown.Item text={issue.title} key={issue.id} value={issue.title} onClick={this.handleClick}/>

  	// })

	        // <Dropdown placeholder='Select Issue' fluid selection options={RepoIssuesList} text={this.state.issueName}/>
    return(
        <div>
          <h2>GitHub User {this.props.repoName} Issues</h2>
	      </div>  
    )
  }
}
export default RepoIssues;
