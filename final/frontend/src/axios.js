import axios from 'axios'

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/"
    : "http://localhost:4000/";

const instance = axios.create({ baseURL: API_ROOT })

const createReq = async () => {
    // const { data: { msg } } = await instance.post('/create');
    // return msg;
    return "created";
}

const openReq = async () => {
    // const { data: { msg } } = await instance.post('/open');
    // return msg;
    return "opened";
}

const saveSong = async (id, name, composer, data, user, works) => {
    console.log('saved');
    let concatedData = [];
    data.map((arr,index)=>{
        arr.map(e=>{concatedData.push({pitch:e.pitch,beat:e.beat,duration:e.duration,section:index})})
    })
    const {data:{ message }} = await instance.post('/song', {
        id: id,
        name: name,
        composer: composer,
        data: concatedData,
        user: user,
        works: works
    })
    return message
}

const handleQuery = async (id) => {
    const {
        data : { message },
    } = await instance.get('/songs', {
        params: {
            id: id
        }
    })

    let main = [];
    let second = [];
    let sectionIndex = 0;
    for(let i=0;i<message.data.length;i++){
        if(message.data[i].section !== sectionIndex){
            sectionIndex++;
            i--;
            main.push(second);
            second = [];
        }
        else{
            second.push({pitch:message.data[i].pitch,beat:message.data[i].beat, duration:message.data[i].duration})
        }
    }
    main.push(second);
    // console.log(main);//start from here
    return {song:main,composer:message.composer,name:message.name};
}

const DeleteSong = async (id,user) =>{
    const {
        data : {message},
    } = await instance.get('/deleteSong',{
        params: {
            id : id,
            name:user,
        }
    })
    return message;
}

const CreateUser = async (name, password) => {
    const {
        data : { message },
    } = await instance.post("/user", {
        params : {
            name: name,
            password: password
        }
    })
    return message
}

const FindUser = async (name) => {
    const {
        data : { message },
    } = await instance.get('/users', {
        params : {
            name: name
        }
    })
    return message
}

const createRegister = async (name, pass) => {
  const data = { name: name, pass: pass };
  const {data:{ message }} = await instance.post("/loginapi/register", data);
  return message;
};

const createLogin = async (name, pass) => {
  const data = { name: name, pass: pass };
  const response = await instance.post("/loginapi/login", data);
  return response.data;
};

export { createReq, openReq, saveSong, handleQuery, CreateUser, FindUser, createRegister, createLogin, DeleteSong }