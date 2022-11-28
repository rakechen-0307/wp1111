import { useState, useEffect, useRef } from "react";
import { Input, Tabs } from "antd";
import styled from "styled-components"
import { useChat } from "./hooks/useChat"
import Title from "../components/Title"
import Message from "../components/Message"

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
`
const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const FootRef = styled.div`
  height: 20px;
`

const ChatRoom = () => {
    const { me, messages, sendMessage, displayStatus } = useChat()
    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false)
    const [chatBoxes, setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    //const msgRef = useRef(null)
    const msgFooter = useRef(null)

    const displayChat = (chat) => (
        (chat.length === 0) ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
            <ChatBoxWrapper>
                {chat.map(({name, body}, i) => (
                    <Message isMe={name === me} message={body} key={i}></Message>
                ))}
                <FootRef ref={msgFooter}></FootRef>
            </ChatBoxWrapper>
        )
    )

    const extractChat = (friend) => {
        return displayChat(messages.filter
            (({name, body}) => ((name === friend) || (name === me))))
    }

    const createChatBox = (friend) => {
        if (chatBoxes.some(({key}) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }]);
        setMsgSent(true);
        return friend;
    }

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({behavior:'smooth', block:'start'})
    }

    useEffect(() => {
        scrollToBottom()
        setMsgSent(false)
    }, [msgSent])

    return(
        <>
            <Title name={me}></Title>
            <ChatBoxWrapper>
                {displayMessages()}
                <FootRef ref={msgFooter}></FootRef>
            </ChatBoxWrapper>
            <Input
                placeholder="Username"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                onKeyDown={(e) => {
                    if (e.key === 'Enter'){
                        msgRef.current.focus()
                    }
                }}
            ></Input>
            <Input.Search
                value={msg}
                ref={msgRef}
                onChange={(e) => setMsg(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg || !username) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and a message body.'
                        })
                        return
                    }
                    sendMessage({ name: username, body: msg })
                    setMsg('')
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom