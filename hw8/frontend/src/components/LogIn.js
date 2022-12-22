import {Input} from "antd";
import { UserOutlined } from "@ant-design/icons";

const LogIn = ({me, setMe, handleLogIn}) => {
    return(
        <Input.Search
            size = 'large'
            style = {{ width:300, margin:50 }}
            prefix = {<UserOutlined></UserOutlined>}
            placeholder = "Enter your name."
            value = {me}
            onChange = {(e) => { setMe(e.target.value) }}
            enterButton = "Sign in"
            onSearch={(me) => { handleLogIn(me) }}
        ></Input.Search>
    )
}

export default LogIn