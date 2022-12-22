import './App.css'
import { Button, Input, message, Tag, Tabs } from 'antd'
import {useChat} from './hooks/useChat'
import {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Title from '../components/Title'
import Message from '../components/Message'
import ChatModal from '../components/ChatModal'

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
`;

const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 20px;
`;

const ChatRoom = () => {
  const {messages, clearMessages, me, displayStatus, activeKey, setSub, setActiveKey,
        startChat, sendMessage, setMessages, data} = useChat();
  const [chatboxes, setChatboxes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [body, setBody] = useState('');
  const [bool, setBool] = useState(false);
  const bodyRef = useRef(null);
  const msgFooter = useRef(null);

  const displayMessages = (filtedMessages) => {
    return(
      filtedMessages.length === 0? 
        (<p style={{ color: '#ccc' }}>
          No messages...
        </p>):
        (filtedMessages.map(
          ({sender,to,body},i)=>
            (
              <Message username={sender} isMe={sender === me} message={body} key={i}/>
            )
        ))
    )
  }

  const scrollToBottom = ()=>{
    msgFooter.current = document.getElementById(`footer${activeKey}`)
    msgFooter.current?.scrollIntoView({behavior:"smooth", block:"start"});
  }

  const renderChat = (chat) => {
    return (
    <ChatBoxWrapper>
        {displayMessages(chat)}
        <FootRef id={`footer${activeKey}`} ref={msgFooter}></FootRef>
    </ChatBoxWrapper>
    )
  }
  
  const createChatBox = (friend) => {
    if (chatboxes.some
     (({key}) => key === friend)) {
     throw new Error(friend + "'s chat box has already opened."); }
     const chat = renderChat(messages);
     setChatboxes([...chatboxes,
     { label: friend, children: chat, key: friend }]);
     return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatboxes.findIndex (({key}) => key === activeKey);
    return activeKey?
        activeKey === targetKey?
          chatboxes.length === 1?
            '':
            index === chatboxes.length - 1?
              chatboxes[0].key : chatboxes[index + 1].key
        : activeKey
      : '';
  };

  useEffect(()=>{
    scrollToBottom();
  },[chatboxes, bool])

  useEffect(()=>{
    msgFooter.current = document.getElementById(`footer${activeKey}`)
    if(chatboxes.length !== 0){
      const chat = renderChat(messages);
      const newChatboxes =chatboxes.map((e)=>({
          label: e.label,
          children: e.key === activeKey ? chat : e.children,
          key: e.key
        }))
      setChatboxes(newChatboxes);
    }
  },[messages])

  useEffect(()=>{
    if(!data){
      return
    }
    setMessages(data.chatbox.messages);
  },[data])

  return (<>
      <Title me={me}></Title>
      <>
        <ChatBoxesWrapper 
          tabBarStyle={{height: '36px'}}
          type='editable-card'
          activeKey={activeKey}
          onChange={(key) => {
            setSub(activeKey)
            setActiveKey(key)
            startChat({variables: {name1: me, name2: key}});
          }}
          onEdit={(targetKey, action) => {
            if(action === 'add'){
              setModalOpen(true);
            }
          }}
          items = {chatboxes}
        />
        <ChatModal 
          modalOpen={modalOpen}
          onCreate={({name}) => {
            startChat({ variables: { name1: me, name2: name } });
            setSub(activeKey)
            setActiveKey(createChatBox(name))
            setBool(!bool)
            setModalOpen(false);
          }}
          onCancel={()=>{setModalOpen(false);}}
        ></ChatModal>
      </>
      <Input.Search
        ref = {bodyRef}
        enterButton="Send"
        placeholder="Type a message here..."
        value={body}
        onChange={(e) => { setBody(e.target.value) }}
        onSearch={(msg) => {
          if(!body){
            displayStatus({
              type: 'error',
              msg: 'Please enter a user name and a message body.'
            });
            return;
          }else if(!activeKey){
            displayStatus({
              type: 'error',
              msg: 'Please open a chatroom.'
            });
            return;
          }
          sendMessage({ variables: { sender: me, to: activeKey, body: msg } });
          setBody('');
        }}
      ></Input.Search>
    </>
  )
}

export default ChatRoom
