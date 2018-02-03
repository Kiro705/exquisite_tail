module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('sendingNotification', function(socketId, userId){
    	socket.to(socketId).emit('recievedNotification', userId)
    })

    socket.on('goUpdateFriends', function(socketId, userId){
    	socket.to(socketId).emit('willUpdateFriends', userId)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
