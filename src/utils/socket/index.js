import { io } from "socket.io-client";
import {authHeader} from "../helpers";
import {HOST} from "../../constants/config";

const socket = io(`${HOST}`,{
    transportOptions: {
        polling: {
            extraHeaders: authHeader()
        }
    }
});

socket.on("RECEIVED_ADD_FRIEND_REQUEST", (data) => {
    console.log(data)
})

export default socket;
