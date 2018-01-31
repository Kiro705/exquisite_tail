import io from 'socket.io-client'
import {getNotifications} from './store'


const socket = io(window.location.origin)

socket.sendNotification = function(socketId, userId){
	socket.emit('sendingNotification', socketId, userId)
}

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('recievedNotification', function(userId){
	console.log('You got a notification, user #', userId, '!')
	//how to dispatch?
	// getNotifications(userId)
})

export default socket
