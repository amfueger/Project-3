import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import RoomList from '../RoomList';
import MessageList from '../MessageList';
import NewRoomForm from '../NewRoomForm';
//import SendComment from './SendComment';
import { instanceLocator, testToken, username, roomId } from '../config';

class RoomContainer extends Component{
	constructor(){
		super();

		this.state = {
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: [],
			userId: null
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
			this.currentUser = currentUser;
			this.getRooms();
			this.subscribeToRoom(19409519);
		})
		.catch(err => console.log('err on connecting', err));
		
	}


	 getRooms = () => {
		this.currentUser.getJoinableRooms()
		.then(joinableRooms => {
			this.setState({
				joinableRooms,
				joinedRooms: this.currentUser.rooms
			})
		}).catch(err => console.log(err, 'error on joinable rooms'));
	}

	subscribeToRoom = (roomId) => {
		this.setState({
			messages: []
		})
		this.currentUser.subscribeToRoom({
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
			.then(room => {
				this.setState({
					roomId: room.id
				})
				this.getRooms()
			}).catch(error => console.log(error, 'error subscribing to room'));
	}
	createRoom = (name) => {
		this.currentUser.createRoom({
			roomId: r
		})
		.then(room => this.subscribeToRoom(room.id))
		//the name of the room above can go into the game creation form. The code above that's commented ensures that once the room is created, we go to it. It will work because the form for game creation will include a spot for room creation, and the button will submit change for both game creation AND making the chat box. 
	}
render() {
	return (
		<div className="rooms">
			<RoomList 
			roomId={this.state.roomId}
			subscribeToRoom={this.subscribeToRoom}
			rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
			<MessageList messages={this.state.messages} />
			<NewRoomForm createRoom={this.createRoom} />
		</div>
	)
}

}

export default RoomContainer;