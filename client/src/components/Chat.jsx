import React, {useState, useEffect} from 'react';

function Chat({socket, userName, room}) {

	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	const sendMessage = async () => {

		if(currentMessage !== ""){

			const messageData = {

				room: room,
				author: userName,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

			};

 			await socket.emit("send_message", messageData);
 			setMessageList((list) => [...list, messageData]);
		};

	};

	useEffect(() => {

		socket.on("receive_message", (data) => {

	
			setMessageList((list) => [...list, data]);

		});

	}, [socket]);

	return (
		<div class="grid h-auto place-items-center border-2 border-black">
			<div class="bg-black w-full text-white text-center">

				<p >Live Chat</p>

			</div>
			
			<div class="overflow-y-auto w-full h-96 text-white border-2 border-blue-700 grid grid-cols-2">

				{messageList.map((messageContent) => {

					return (
						<>
							<div class="block">

								<div class="w-full grid-1">

										<h1 class={`${userName === messageContent.author ? "bg-green-700 text-left" : "bg-blue-700 text-rigth"} rounded flex flex-wrap h-auto w-1/2`}>{messageContent.message}</h1>	
								
						
								</div>

								<div>

									<p class="text-black">{messageContent.author} {messageContent.time}</p>

								</div>

							</div>
						<br/>
						</>
						)

				})}

			</div>
			
			<div className="chat-footer">

				<input type="text" placeholder="Hey..." onChange={(event) => {

					setCurrentMessage(event.target.value)

				}}/>
				<button onClick={sendMessage}>&#9658;</button>

			</div>
		</div>
	)

}

export default Chat;