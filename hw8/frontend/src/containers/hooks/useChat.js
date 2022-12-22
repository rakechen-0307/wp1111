import {createContext, useContext, useState, useEffect} from "react";
import {message} from 'antd';
import { useLazyQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";


const LOCAL_STORAGE_KEY = 'saveMe';
const saveMe = localStorage.getItem(LOCAL_STORAGE_KEY);

const chatContext = createContext({
    status:{},
    displayStatus: ()=>{},
    messages: [],
    sendMessage: ()=>{},
    setSignedIn: ()=>{},
    setMe: ()=>{},
    me: '',
    signedIn: false,
    startChat: ()=>{},
    activeKey: '',
    setSub: ()=>{},
    setActiveKey: ()=>{},
    setMessages: ()=>{},
})

const ChatProvider = (props)=>{
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const [me, setMe] = useState(saveMe || '');
    const [activeKey, setActiveKey] = useState('');
    const [sub, setSub] = useState('');
    const [disSubscribe, setDisSubscribe] = useState({});

    const [getChatBox, { data, loading, subscribeToMore, refetch }] = useLazyQuery(CHATBOX_QUERY, {
        variables: {
            name1: me,
            name2: activeKey,
        },
      });

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    useEffect(() => {
      try {
        refetch()
        if(disSubscribe[sub]){
          disSubscribe[sub]()
        }

        const subscribeTo = subscribeToMore({
          document: MESSAGE_SUBSCRIPTION,
          variables: { sender: me, to: activeKey },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.message;
            return {
              chatbox: {
                name: prev.chatbox.name,
                messages: [...prev.chatbox.messages, newMessage],
              },
            };
          },
        });

        let disSubscribeCopied = JSON.parse(JSON.stringify(disSubscribe))
        disSubscribeCopied[activeKey] = subscribeTo
        setDisSubscribe(disSubscribeCopied)

      } catch (e) {}
    }, [subscribeToMore, activeKey]);

    const displayStatus = (s)=>{
        if(s.msg){
          const {type,msg} = s;
          const content = {content:msg, duration:0.5}
          switch(type){
            case "success":
              message.success(content);
              break;
            case "info":
              message.info(content);
              break;
            case "error":
            default:
              message.error(content);
              break;
          }
        }
      }

    useEffect(()=>{
        if(signedIn){
            localStorage.setItem(LOCAL_STORAGE_KEY,me);
        }
    },[signedIn])

    return (<chatContext.Provider 
        value = {{status, messages, setSignedIn, setMe, me, signedIn, displayStatus, startChat, sendMessage,
            activeKey, setSub, setActiveKey, setMessages, data}}
        {...props}/>)
}

function useChat(){ return useContext(chatContext) }

export { ChatProvider , useChat };