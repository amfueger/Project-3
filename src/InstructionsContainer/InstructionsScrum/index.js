import React, { Component } from 'react';
import { Header, Button, Modal } from 'semantic-ui-react';


class InstructionsScrum extends Component {
  render(){
    return(
      <div>
      	 <Modal trigger={<Button> Scrum Instructions</Button>}
        >
          <Modal.Header>Scrum Instructions</Modal.Header>
          <Modal.Description style={{padding: '20px'}}>
          <Header> How to Play</Header>
          <h4>Welcome to Planning Poker!</h4>
          <p>As the Scrum Master, it's your job to facilitate game-play for your coworkers in order to receive a consensus on how long a feature, user story, or bug fix is going to take. Go to your profile to create a new game, inviting members of your company in order to let gameplay begin.</p>
          <h4>Game Play</h4>
          <p>
            Once the game has started, you can sit back and discuss with your team. While you can choose to end the game at any time, you do not particpate in voting. 
          </p>
          <h4>Resolution</h4>
          <p>
            Once the game is over, you can set a calendar invite using the date and time-frame giving at the end. Thanks for playing!
          </p>
          </Modal.Description>
        </Modal>
    	</div>
    )
  }
}
export default InstructionsScrum;
