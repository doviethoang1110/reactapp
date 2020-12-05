import socket from "../../utils/socket/index";

export const addFriendRequest = (data) => {
    socket.emit("SEND_ADD_FRIEND_REQUEST", data);

    socket.on("ADD_FRIEND_REQUEST_FAILURE", (data) => {
        console.log(data)
    });
}

export const deniedFriendRequest = (data) => {
    socket.emit("DENIED_ADD_FRIEND_REQUEST", data);
}