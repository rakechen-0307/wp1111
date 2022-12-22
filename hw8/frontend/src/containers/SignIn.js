import Title from '../components/Title';
import LogIn from '../components/LogIn';
import {useChat} from './hooks/useChat'

const SignIn = ()=>{
    const {displayStatus, setSignedIn, me, setMe} = useChat();
    const handleLogIn = (name)=>{
        if(!name){
            displayStatus({
                type:"error",
                msg:"Missing user name."
            })
        }else{
            setSignedIn(true);
        }
    }
    return (
        <>
            <Title me={me}/>
            <LogIn me={me} setMe={setMe} handleLogIn={handleLogIn}/>
        </>
    );
}

export default SignIn;