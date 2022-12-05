import React, { useState } from 'react';
import io  from 'socket.io-client';
import Chat from './components/Chat';


const socket = io("http://localhost:8000", { transports: ["websocket"] });

function App() {

  const [userName, setUserName] = useState("");

  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {

    if (userName !== "" && room !== ""){

        socket.emit("join_room", room);
        setShowChat(true);

    }

  };

  return (
    <div className="App">
      {!showChat ? (
        <div>
          <h3 class="border-2">Join A Chat</h3>
          <input type="text" placeholer="Alison..." onChange={

            (event) => {

              setUserName(event.target.value)
          
            }
          
          }/>
          <input type="text" placeholer="Room ID..." onChange={

            (event) => {

              setRoom(event.target.value)
          
            }
          
          }/>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) 
      : (
        <Chat socket={socket} userName={userName} room={room}/>
        )}
    </div>
  );
}

export default App
