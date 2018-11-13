import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import RepoIssues from '../RepoIssues';
// import serverURL from './serverURL.js';


class Repos extends Component {

  constructor(){
    super();

    this.state = {
      repos: [],
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

  getRepos = async () => {
    try {
      const repos   = await fetch('https://api.github.com/users/charlotteprevost/repos');
      const reposJson = await repos.json();
      console.log(reposJson);
      return reposJson;

    } catch(err){
      console.log(`Error in getRepos() => catch(err){}\n`, err);
      return err;
    }
  }

  componentDidMount(){

    this.getRepos().then(data => {

      // console.log(`repos data from componentDidMount: `, data);
      this.setState({repos: data});
      // console.log(`this.state.repos: `, this.state.repos);

    }).catch(err => {
      console.log(`Error in componentDidMount .catch(err){}\n`, err);     
    })
  }
  render(){

    // let isArr = Array.isArray(this.props.this.state.repos);
    // console.log(`this.props.this.state.repos isArr: `, isArr);
    // if (this.state.repos !== null && this.state.repos !== undefined) {
    //   let allRepos = Array.from(this.state.repos);
    //   console.log(`this.state.repos: `, this.state.repos);

    //   let gitHubUserReposList = allRepos.map((repo, i) => {
    //     return (
    //       <Dropdown.Item text={repo.name} key={repo.id} value={repo.name} onClick={this.handleClick}/>
    //    )
    //   })
    // } else {
    //   let gitHubUserReposList = []
    // }

    // console.log(this.state);

    //  <div>
    //     <h2>GitHub User Repos List</h2>
    //     {!this.state.repos ? 
    //     <Dropdown 
    //       placeholder='Select Repo' 
    //       fluid selection 
    //       options={gitHubUserReposList} 
    //       text={this.state.repoName}/>
    //     : <p>You Have No Repos</p>}
          
    //       {this.state.repoSelected ? 
    //         <RepoIssues 
    //           repoName={this.state.repoName} 
    //           username={this.props.username}/> 
    //           : <p>Select a Repo above to view issues</p>}
    //   </div>

    return (
      <div>Repos</div>
    )
  }
}
export default Repos;
