import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Message from './Message.js';
//this is the container for messages within a room. 
class MessageList extends Component{
//Because the scroll to the bottom will always put you at the bottom when a new message is added, this is a component to preven that when you're scrolled up. It is triggered before, to check. 
	componentWillUpdate() {
	const node = ReactDOM.findDOMNode(this)
	this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
	}
//This makes the scroll go to the bottom, particularly when
//there are new messages
	componentDidUpdate() {
		if (this.shouldScrollToBottom) { 
		const node = ReactDOM.findDOMNode(this)
		node.scrollTop = node.scrollHeight
		}
	}
	render() {
		if (!this.props.roomId) {
			return (
			<div className="message-list">
				<div className="join-room">
				Should not see this screen
				</div>
			</div>
			)
		}
		return (	
			<div className="message-list">
				{this.props.messages.map((message, i) => {
					return (
						<Message 
						key={i} 
						username={message.senderId} 
						text={message.text} 
						/>
				)
			})}
			</div>
		)
	}
}
export default MessageList;