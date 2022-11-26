import { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import styled from "styled-components"
import { useChat } from "./hooks/useChat"
import Title from "../components/Title"
import Message from "../components/Message"

const ChatBoxWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`

const FootRef = styled.div`
  height: 20px;
`

const ChatRoom = () => {
    const { me, messages, sendMessage, displayStatus } = useChat()
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false)

    const msgRef = useRef(null)
    const msgFooter = useRef(null)

    const displayMessages = () => (
        (messages.length === 0) ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
            messages.map(({ name, body }, i) => (
                <Message name={name} isMe={name === me} message={body} key={i}></Message>
            ))
        )
    )

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
                onChange={(e) => {
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