import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

// server is the http server
export const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			credentials: true,
		},
	});

	// when user logs in, it gets a socket id
	const userSockets = new Map(); // { userId: socketId}

	// what user is listening to etc.
	const userActivities = new Map(); // {userId: activity}

	io.on("connection", (socket) => {
		// socket.on is used to listen the event on server and client
		socket.on("user_connected", (userId) => {
			userSockets.set(userId, socket.id); // set the socket id for the user
			userActivities.set(userId, "Idle"); // set the activity for the user (Idle initially)

			// broadcast to all connected sockets that this user just logged in
			io.emit("user_connected", userId); // server -> all clients

			// online users are basically all the users who are connected to the server (in the userSockets map)
			// keys are the user ids
			socket.emit("users_online", Array.from(userSockets.keys()));

			// broadcast the activities to all connected sockets
			io.emit("activities", Array.from(userActivities.entries()));
		});

		// update the activity of the user when they change the music etc.
		socket.on("update_activity", ({ userId, activity }) => {
			console.log("activity updated", userId, activity);
			userActivities.set(userId, activity);
			io.emit("activity_updated", { userId, activity });
		});

		socket.on("send_message", async (data) => {
			try {
				const { senderId, receiverId, content } = data;

				const message = await Message.create({
					senderId,
					receiverId,
					content,
				});

				// send to receiver in realtime, if they're online
				const receiverSocketId = userSockets.get(receiverId);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("receive_message", message);
				}

				socket.emit("message_sent", message);
			} catch (error) {
				console.error("Message error:", error);
				socket.emit("message_error", error.message);
			}
		});

		socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId, socketId] of userSockets.entries()) {
				// find disconnected user
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSockets.delete(userId);
					userActivities.delete(userId);
					break;
				}
			}
			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);
			}
		});
	});
};