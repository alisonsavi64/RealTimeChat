const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors({

	origin: 'http://localhost:5173'

}));

const io = require('socket.io')(http);

io.on("connection", (socket) => {

	console.log(socket.id);

	socket.on("join_room", (data) => {

		socket.join(data);
		console.log(`User with ID: ${socket.id} Join room: ${data}`);

	});

	socket.on("send_message", (data) => {
		console.log(data)
		socket.to(data.room).emit("receive_message", data);

	})

	socket.on("disconnect", () => {
		console.log("User Disconnect", socket.id);
	});

});



http.listen(8000, () => {console.log("SERVER RUNING")});
