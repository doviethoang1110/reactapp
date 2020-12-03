import socket from "../../utils/socket/index";

export const addFriendRequest = (data) => {
    socket.emit("SEND_ADD_FRIEND_REQUEST", data);
    socket.on("ADD_FRIEND_REQUEST_SUCCESS", (data) => {
        console.log(data)
    });
    socket.on("ADD_FRIEND_REQUEST_FAILURE", (data) => {
        console.log(data)
    });
}
