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
    <div class="grid h-screen place-items-center">
      {!showChat ? (
        <div class="w-96 text-center bg-white border-2 border-black grid h-72 place-items-center">
          <h3 class="text-3xl">Join a Chat</h3>
          <input class="border-2 border-black" type="text" placeholer="Alison..." onChange={

            (event) => {

              setUserName(event.target.value)
          
            }
          
          }/>
          <input class="border-2 border-black" type="text" placeholer="Room ID..." onChange={

            (event) => {

              setRoom(event.target.value)
          
            }
          
          }/>
          <br/>
          <button class="w-44 h-16 bg-black rounded text-white" onClick={joinRoom}>Join A Room</button>
        </div>
      ) 
      : (
        <Chat socket={socket} userName={userName} room={room}/>
        )}
    </div>
  );
}

export default App
