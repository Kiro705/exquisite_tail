import io from 'socket.io-client'
import store, {getNotifications, getFriends} from './store'


const socket = io(window.location.origin)

socket.sendNotification = function(socketId, userId){
	socket.emit('sendingNotification', socketId, userId)
}

socket.updateFriends = function(socketId, userId){
	socket.emit('goUpdateFriends', socketId, userId)
}

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('recievedNotification', function(userId){
	store.dispatch(getNotifications(userId))
})

socket.on('willUpdateFriends', function(userId){
	store.dispatch(getFriends(userId))
})

export default socket
