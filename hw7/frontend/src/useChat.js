import { useState } from "react";

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    const sendMessage = (payload) => {
        console.log(payload);
        sendData(["input", payload])
        setMessages([payload]);
        setStatus({ type:"success", msg:"Message sent." })
    }

    const client = new WebSocket ('ws://localhost:4000')
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    return {
        status, messages, sendMessage
    };
};

export default useChat;