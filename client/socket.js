import io from 'socket.io-client'
import store, {getNotifications} from './store'


const socket = io(window.location.origin)

socket.sendNotification = function(socketId, userId){
	socket.emit('sendingNotification', socketId, userId)
}

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('recievedNotification', function(userId){
	store.dispatch(getNotifications(userId))
})

export default socket
