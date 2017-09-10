import { Socket } from './Phoenix'

const TIMEOUT = 10000
const URL = 'http://localhost:4000/socket'
//const LOBBY = 'rooms:lobby'
// const LOBBY = 'rooms:'
//Lobby should be passed in this function as we need it dynamic
//can't really update the Lobby variable so need to create it inside the function only
//no no this is js. no Phoenix here bro

export default (user, onChat, LOBBY_ID) => {
  // construct a socket
  // console.log
  const socket = new Socket(URL)
  console.log("Socket",socket)
  // configure the event handlers
  socket.onOpen(event => console.log('Connected.'))
  socket.onError(event => console.log('Cannot connect.'))
  socket.onClose(event => console.log('Goodbye.'))

  // open a connection to the server
  socket.connect()

  // configure a channel into a room - https://www.youtube.com/watch?v=vWFX4ylV_ko
  //problem is here
  //can be easily solved
  LOBBY = 'rooms:' + LOBBY_ID;
  // LOBBY = 'rooms:' +  ;
  console.log(LOBBY);
  const chan = socket.channel(LOBBY, { user })

  // join the channel and listen for admittance
  chan.join()
    .receive('ignore', () => console.log('Access denied.'))
    .receive('ok', () => console.log('Access granted.'))
    .receive('timeout', () => console.log('Must be a MongoDB.'))

  // add some channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'))
  chan.onClose(event => console.log('Channel closed.'))

  // when we receive a new chat message, just trigger the appropriate callback
  chan.on('new:msg', msg => onChat && onChat(msg))

  // you can can listen to multiple types
  chan.on('user:entered', msg => console.log('say hello to ', msg))

  // a function to shut it all down
  const close = () => socket.disconnect()

  // a function to send a message
  const send = (message) => {
    // chan.push('new:msg', {body: message.text , user ,to: message.to}, TIMEOUT)
    chan.push('new:msg', {content: message.text , sent_by : user ,recieved_by: message.to, sender_id: message.sender_id, chat_pair_id : "1"}, TIMEOUT)
      .receive('ok', (msg) => console.log('sent'))
      .receive('error', (reasons) => console.log('flop', reasons))
      .receive('timeout', () => console.log('slow much?'))
  }

  // reveal a couple ways to drive this bus
  return { close, send }
}
