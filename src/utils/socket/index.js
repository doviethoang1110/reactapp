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

export default socket;
