import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit'
//import Title from './Title'
import MessageList from './MessageList.js';
import SendMessageForm from './SendMessageForm.js';
//import RoomList from '../RoomList';
//import SendComment from './SendComment';
//import { instanceLocator, roomId, testToken, username } from '../config'
const instanceLocator = 'v1:us1:1a9bd709-cbaf-4b9d-b48c-c1d84ce94ca3';
const testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1a9bd709-cbaf-4b9d-b48c-c1d84ce94ca3/token';
const roomId  = 19409519;
const username = 'TEST';
class ChatContainer extends Component{
	constructor(){
		super();

		this.state = {
			roomId: roomId,
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		}
	}
	componentDidMount(){
		const chatManager = new Chatkit.ChatManager({
			instanceLocator: instanceLocator,
			userId: username,
			tokenProvider: new Chatkit.TokenProvider({
				url: testToken
			})
		})
		chatManager.connect()
		.then(currentUser => {
			this.currentUser = currentUser

			this.currentUser.getJoinableRooms()
			.then(joinableRooms => {
				this.setState({
					joinableRooms,
					joinedRooms: this.currentUser.rooms
				})
			}).catch(err => console.log(err, 'error on joinable rooms'));

			currentUser.subscribeToRoom({
				roomId: roomId,
				messageLimit: 100,
				hooks: { 
					onNewMessage: message => {
						console.log(message.text);
						this.setState({
							messages: [...this.state.messages, message]
						})
					}
				}
			})
		}).catch(err => console.log('err on connecting', err));
	}
	sendMessage = (text) => {
		this.currentUser.sendMessage({
			text,
			roomId: this.state.roomId
		})
	}
render() {
	return (
		<div className="chat">
			<MessageList 
			roomId={this.state.roomId}
			messages={this.state.messages}/>
			<SendMessageForm 
			disabled={!this.state.roomId}
			sendMessage={this.sendMessage} />
		</div>
	)
}

}

export default ChatContainer;