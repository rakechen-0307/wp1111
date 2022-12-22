import './App.css'
import { useChat } from './hooks/useChat'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
  const { displayStatus, signedIn, status } = useChat();

  useEffect(() => {
    displayStatus(status);}
  ,[status])

  return(
    <Wrapper>
      {signedIn ? <ChatRoom></ChatRoom> : <SignIn></SignIn>}
    </Wrapper>
  )
}

export default App