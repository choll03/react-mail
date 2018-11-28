const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    TYPING  } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = { }

let communityChat = createChat()

let koneksi = [];

module.exports = function(socket){

  // console.log('\x1bc'); //clears console
  // console.log("Socket Id:" + socket.id);
  let socketId ;
  let sendMessageToChatFromUser;

  let sendTypingFromUser;

  //Verify Username
  // socket.on(VERIFY_USER, (nickname, callback)=>{
  //   if(isUser(connectedUsers, nickname)){
  //     callback({ isUser:true, user:null })
  //   }else{
  //     callback({ isUser:false, user:createUser({name:nickname})})
  //   }
  // })

  socket.on("ADMIN_LOGIN", (user) => {
    io.emit("KONEKSI", koneksi);
  })

  socket.on("SEND_TO", (data) => {
    io.to(data.to).emit("tes", "haha");
  })

  //User Connects with username
  socket.on(USER_CONNECTED, (user)=>{
    koneksi.push(user);
    socketId = user;
    // connectedUsers = addUser(connectedUsers, user)
    // socket.user = user
    //
    // sendMessageToChatFromUser = sendMessageToChat(user.name)
    // sendTypingFromUser = sendTypingToChat(user.name)
    //
    io.emit(USER_CONNECTED, koneksi)
    // console.log(koneksi);
  })

  //User disconnects
  socket.on('disconnect', ()=>{
    koneksi.splice(koneksi.indexOf(socketId),1);
    // if("user" in socket){
    //   connectedUsers = removeUser(connectedUsers, socket.user.name)
    //
      io.emit(USER_CONNECTED, koneksi)
    //   console.log("Disconnect", connectedUsers);
    // }
    // console.log(koneksi);
  })


  //User logsout
  socket.on(LOGOUT, ()=>{
    connectedUsers = removeUser(connectedUsers, socket.user.name)
    io.emit(USER_DISCONNECTED, connectedUsers)
    console.log("Disconnect", connectedUsers);

  })

  //Get Community Chat
  socket.on(COMMUNITY_CHAT, (callback)=>{
    callback(communityChat)
  })

  socket.on(MESSAGE_SENT, ({chatId, message})=>{
    sendMessageToChatFromUser(chatId, message)
  })

  socket.on(TYPING, ({chatId, isTyping})=>{
    sendTypingFromUser(chatId, isTyping)
  })

}
/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendTypingToChat(user){
  return (chatId, isTyping)=>{
    io.emit(`${TYPING}-${chatId}`, {user, isTyping})
  }
}

/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendMessageToChat(sender){
  return (chatId, message)=>{
    io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
  }
}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user){
  console.log(userList);
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username){
  let newList = Object.assign({}, userList)
  delete newList[username]
  return newList
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username){
  console.log(userList);
  return username in userList
}
