import { useState, useEffect, createContext, useContext } from "react";
import { message } from "antd";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
});

const client = new WebSocket ('ws://localhost:4000')

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);

    const sendData = async (data) => {
        client.send(JSON.stringify(data));
        console.log("data")
    };

    const clearMessages = () => {
        sendData(["clear"]);
    };

    const startChat = (name, to) => {
        if (!name || !to) {
            throw new Error('Name or to required')
        }
        console.log(name)
        console.log(to)
        sendData([ 'CHAT', {name, to}])
    }

    const sendMessage = (payload) => {
        const {name, to, body} = payload
        if (!name || !to || !body){
            throw new Error('Name or to or body required')
        }
        sendData(['MESSAGE', {name, to, body}])
    }

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = { content: msg, duration: 0.5 }
            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'error':
                default:
                    message.error(content)
                    break
            }
        }
    }

    client.onmessage = (byteString) => {
        const {type, payload} = JSON.parse(byteString.data)
        switch(type){
            case 'CHAT':{
                setMessages(payload)
                break
            }
            case 'MESSAGE': {
                setMessages(() => [...messages, payload])
                break
            }
            default: break
        }
    }

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    return (
        <ChatContext.Provider
            value={{
                status, me, signedIn, messages, setMe, setSignedIn,
                startChat, sendMessage, clearMessages, displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };