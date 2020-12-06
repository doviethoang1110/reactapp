import socket from "../../utils/socket/index";

const logSocketError = (socket) => {
    socket.on("FAILURE", (data) => {
        console.log(data)
    });
}

export const addFriendRequest = (data) => {
    socket.emit("SEND_ADD_FRIEND_REQUEST", data);
    logSocketError(socket);
}

export const destroyFriendRequest = (data) => {
    socket.emit("REMOVE_ADD_FRIEND_REQUEST", data);
}

export const acceptFriendRequest = (data) => {
    socket.emit("ACCEPT_ADD_FRIEND_REQUEST", data);
   logSocketError(socket);
}