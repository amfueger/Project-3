import React, { Component } from 'react';
import { Header, Modal, Button } from 'semantic-ui-react';


class InstructionsEstimator extends Component {
  render(){
    return(
      <div>
        <Modal trigger={<Button> Estimator Instructions</Button>}
        >
          <Modal.Header>Estimator Instructions</Modal.Header>
          <Modal.Description style={{padding: '20px'}}>
          <Header> How to Play</Header>
          <h4>Welcome to Planning Poker!</h4>
          <p>As an estimator, your job is to decide how many days you think the proposed feature, user story, or bug fix is going to take. The scrum master will create the game, inviting you and your coworkers to play. Log in and check your profile to see if you have any game requests!</p>
          <h4>Game Play</h4>
          <p>
            Once you have joined your company's game, let the debate begin. Make comments regarding your thoughts on timing for the issue, and when you're ready, click your vote button to be taken to the voting page. There you will have the option of selecting an approximate number of days you think completion of the feature will take.</p>
            <h4>Resolution</h4>
           <p>
            If you and your co-workers do NOT have a consensus on how long you think the feature will take, you will be taken back to the game to comment and vote once more. Otherwise, if you all agree on a time-frame, you've completed Planning Poker!
          </p>
          </Modal.Description>
        </Modal>
    	</div>
    )
  }
}
export default InstructionsEstimator;
