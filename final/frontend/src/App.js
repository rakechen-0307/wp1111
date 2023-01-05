import './components/css/App.css';
import './components/css/SongMaker.css';
import {useEffect, useState} from 'react';
import PlayingPage from './components/PlayingPage';
import EditPage from './components/EditPage';
import OpenPage from './components/OpenPage';
import CreatePage from './components/CreatePage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { init, redetectInputDevice, score, stopIt } from './components/library/webmidi'
import { createReq, openReq, saveSong } from './axios';
import { v4 as uuid } from 'uuid';
import * as Tone from 'tone';
import low from "./components/library/sound/low.wav";
import high from "./components/library/sound/high.wav";
import convertNoteToVex from './components/library/convert';
import modify from './components/library/modify';
import { message } from 'antd';

function App() {
  const [created, setCreated] = useState(false);
  const [opened, setOpened] = useState(false);
  const [composer, setComposer] = useState("");
  const [fileName, setFileName] = useState("");
  const [start, setStart] = useState(false);
  const [logIn, setLogIn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [startPlaying, setStartPlaying] = useState(false);
  const [user, setUser] = useState('Ric');
  const [works, setWorks] = useState([]);
  const [bpm, setBpm] = useState(90);
  const [countdown, setCountdown] = useState('');
  const [edit, setEdit] = useState(false);
  const [song, setSong] = useState([]);
  const [page,setPage]= useState(0);
  const [editPlaying, setEditPlaying] = useState(false);

  const switchToLogIn = () => {
    setLogIn(true);
  }

  const switchToSignUp = () => {
    setLogIn(false);
  }

  const switchToOpen = () => {
    setCreated(false);
    setOpened(true);
  }

  const switchToCreate = () => {
    setOpened(false);
    setCreated(true);
  }

  const LogOut = ()=>{
    setCreated(false);
    setOpened(false);
    setComposer('');
    setFileName('');
    setStart(false);
    setLogIn(true);
    setPlaying(false);
    setEdit(false);
    setEditPlaying(false);
    setCountdown('');
  }

  const BackToHome = () => {
    setCreated(false);
    setOpened(false);
    setComposer('');
    setFileName('');
    setStart(true);
    setLogIn(false);
    setPlaying(false);
    setEdit(false);
    setCountdown('');
    setEditPlaying(false);
  }

  const EnterMainPage = () => {
    setStart(true)
  }

  const EnterPlayingPage = () => {
    setCountdown('');
    setPlaying(true)
  }

  const EnterEditPlayPage = ()=>{
    setCountdown('');
    setEditPlaying(true);
    setPlaying(true);
    setEdit(false);
  }

  const createNewMusic = async () => {
    setCreated(true);
  }

  const openMusic = async () => {
    setOpened(true);
  }

  const StartPlaying = () => {
    init(bpm,countdown,setCountdown)
    // playClock()
  }

  const StopPlaying = async () => {
    let prevSong = stopIt();
    const newPrevSong = modify(prevSong);
    console.log("song= "+newPrevSong)
    const songSaved = convertNoteToVex(newPrevSong)
    if(songSaved !== "empty message"){
      setSong(songSaved);
      setEdit(true);
      setEditPlaying(false);
    }
    else{
      message.error("you didn't type in anything :(");
      setEdit(false);
      setCountdown("")
    }
  }

  const StopEditPlaying = async () => {
    let prevSong = stopIt();
    // console.log('song = ', prevSong);
    const newPrevSong = modify(prevSong);
    const songSaved = convertNoteToVex(newPrevSong)
    const concattedSong = song.concat(songSaved)
    if(concattedSong !== "empty message"){
      setSong(concattedSong);
      setEdit(true);
      setEditPlaying(false);
    }
    else{
      message.error("you didn't type in anything :(");
      setEdit(false);
      setCountdown("")
    }
  }

  useEffect(()=>{
    setPage(0);
  },[edit]);

  const handleRecord = () => {
    if (startPlaying) {
      if(editPlaying){
        StopEditPlaying();
      }else{
        StopPlaying();
      }
    }
    else {
      StartPlaying()
    }
    setStartPlaying(!startPlaying)
  }

  const makeID = () => {
    const ID = uuid()
    return ID
  }

  const SaveSong = () => {

    setWorks([...works, {id: makeID(), name: fileName, composer: composer}])
  }

  useEffect(()=>{
    if(works.length === 0 || fileName === '' || composer === ''){return;}
    saveSong(works[works.length-1].id, fileName, composer, song, user, works)
  },[works])

  const startMenu =
    <div id='startMenu'>
      <button onClick={createNewMusic} className='startBtn'> create new file </button>
      <button onClick={openMusic} className='startBtn'> open file </button>
    </div>

  const openPage = 
    <OpenPage works={works} setWorks={setWorks} setComposer={setComposer} setFilename={setFileName} setEdit={setEdit} setSong={setSong} user={user}></OpenPage>

  const createPage =
    <CreatePage setFileName={setFileName} fileName={fileName} setComposer={setComposer} 
                composer={composer} EnterPlayingPage={EnterPlayingPage}
                works={works} setWorks={setWorks} makeID={makeID} bpm={bpm} setBpm={setBpm} />
 
  return <div className='App'>
    {start? 
      edit ?     
      <>    
      <div className ='up-left_Btns'>
        <button className ='up-left_button BtnShift' onClick={BackToHome}>Back To HomePage</button>
      </div> 
      <div className='up-right_items'>
        <button id ='LogOutBtn' onClick={EnterEditPlayPage}>Keep Edit</button>
      </div>
      <div class = {playing?'save':'none'}>
        <p id = 'saveOrNot'>Save it?</p>
        <div class = 'chooseBtns'>
          <button id='Yes' onClick={async()=>{await SaveSong(); BackToHome()}}>Yes</button>
          <button id='No' onClick={BackToHome}>No</button>
        </div>
      </div>
      </>
      :
      playing? <></>
      :
      editPlaying?<></>
      :
      created? 
        <div className ='up-left_Btns'>
          <button className ='up-left_button' onClick={switchToOpen}>Open file</button>
        </div>
      :
        opened?
          <div className ='up-left_Btns'>
            <button className ='up-left_button' onClick={switchToCreate}>Create a new file</button>
          </div>
        :
        <></>
    :
      <div className ='up-left_Btns'>
        <button id='LogInBtn' onClick={switchToLogIn}>Log In</button>
        <button id='SignUpBtn' onClick={switchToSignUp}>Sign Up</button>
      </div>}

    {
      start?
        edit ?
        <></>
        :
        playing?
        <div className='playingBtn'>
          <button id='Record' onClick={handleRecord}>{startPlaying ? 'Stop' : 'Start'}</button>
        </div>
        :
        editPlaying?
        <div className='playingBtn'>
          <button id='Record' onClick={handleRecord}>{startPlaying ? 'Stop' : 'Start'}</button>
        </div>
        :
        <div className='up-right_items'>
          <p id = 'showUserName'>username: {user}</p>
          <button id ='LogOutBtn' onClick={LogOut}>Log Out</button>
        </div>
      :
      <></>
    }

    {start ? 
      edit ? <EditPage song={song} page={page} setPage={setPage} ></EditPage>
      :
      playing? <PlayingPage countdown={countdown} startPlaying={startPlaying}></PlayingPage>
      :
      created? createPage
      : 
        opened? openPage
        : 
        startMenu 
    : 
      logIn ? 
        <LogIn EnterMainPage={EnterMainPage} setUser={setUser} setWorks={setWorks} ></LogIn>
        : 
        <SignUp EnterMainPage={EnterMainPage} setGlobalUser={setUser}></SignUp>
    }

  </div>
 }
export default App;