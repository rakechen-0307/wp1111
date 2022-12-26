# Web Programming HW#9

website : wp1111-hw9-production-b8d9.up.railway.app

功能 : 如 hw6 ， 但只能 add 跟 update score

流程 :

1. 新建一個 repo 把自己的 code 獨立放到裡面
2. 在 railway 裡面創一個 mongoDB 並連到這個 database
3. 照著 hackMD(https://hackmd.io/@madmaxie/SJGCUr8Oo) 的流程去改 code 並把 repo 上傳到 railway
4. 開啟網站即可使用

遇到的困難 :
repo 裡的 connection.js 的 code 應該要改成底下這樣(debug 弄超久 QQ) :

import axios from "axios";

const API_ROOT =  
 process.env.NODE_ENV === "production"  
 ? "/"  
 : "http://localhost:4000/";  
export const api = axios.create({ baseURL: API_ROOT });
