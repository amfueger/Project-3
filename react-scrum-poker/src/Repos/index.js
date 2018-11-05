import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import RepoIssues from '../RepoIssues';

class Repos extends Component {

  constructor(){
    super();

    this.state = {
      repoSelected: false,
      repoName: '',
      issues: []
    }
  }

  handleClick = (e, data) => {
    e.preventDefault();
    this.setState({             // Set repoName to selected repo's name
      repoSelected: true,
      repoName: data.value
    });
  }

  render(){

    // let isArr = Array.isArray(this.props.allRepos);
    // console.log(`this.props.allRepos isArr: `, isArr);

    let allRepos = Array.from(this.props.allRepos);
    console.log(`allRepos: `, allRepos);

    const gitHubUserReposList = allRepos.map((repo, i) => {
      return (
        <Dropdown.Item text={repo.name} key={repo.id} value={repo.name} onClick={this.handleClick}/>
     )
    })

    console.log(this.state);

    return (
      <div>
        <h2>GitHub User Repos List</h2>
        <Dropdown placeholder='Select Repo' fluid selection options={gitHubUserReposList} text={this.state.repoName}/>
        {this.state.repoSelected ? <RepoIssues repoName={this.state.repoName} username={this.props.username}/> : <p>Select a Repo above to view issues</p>}
      </div>
    )
  }
}
export default Repos;
