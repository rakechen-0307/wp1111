# [111-1] Web Programming Final

### ( Group73 ) Online Music DAW

#### Demo 影片連結:

https://youtu.be/Qyn8kR5L5J8

#### 服務介紹:

由於組員喜歡玩音樂和編曲，但大多的編曲軟體並沒有提供自動打譜的功能，要自己手動製作樂譜相當耗時而麻煩，因此我們才想製作一個能夠在 MIDI 鍵盤輸入音訊或利用電腦鍵盤當作鋼琴輸入音符後，能夠即時將樂譜自動生成出來的網站服務，方便編曲者進行編曲。

#### Deployed 連結

https://wp1111-final-production-2b01.up.railway.app/

#### 使用/操作方式:

1. 登入、註冊：我們有實作帳號系統，在註冊頁面輸入欲註冊的帳號密碼即可完成註冊，並可用於之後登入時使用
2. 開啟舊檔或是新檔案：登入完以後可以選擇開啟新的檔案或者是從之前儲存的舊檔案進行編輯。新檔案的部分會再要求輸入曲名、作者、bpm 資訊後進入編輯頁面。
3. 樂譜編輯頁面：透過開啟新檔案或是在瀏覽頁面選擇編輯後進入。頁面右上方有開始錄製的 Start 鈕，按下後便可在倒數計時後配合節拍器進行譜曲；完成錄製後，按下右上角的 Stop 鈕後便可以看到剛才輸入的音符會以五線譜的形式出現在畫面上(若是小節數超過畫面限制也能透過左右邊的箭頭進行切換)，並可決定是否要儲存此樂譜
4. 樂譜瀏覽頁面：透過開啟舊檔或是在編輯頁面完成儲存後進入。可以在這邊看到該檔案的五線譜譜面，也可透過旁邊的按鈕進入到編輯頁面。
5. 此外，在各個需要輸入資料的場合，若是輸入了不符合要求的輸入，會有相應的錯誤訊息

#### 其他說明：若是使用電腦鍵盤進行輸入，因為鍵盤的硬體因素可能會有鬼鍵的現象導致同時輸入多個音符時無法全部被讀取到。

#### 使用與參考之框架/模組/原始碼

前端：React.js
後端：Express.js
資料庫：MongoDB

#### 使用之第三方套件、框架、程式碼

前端：antd, axios, react, react-dom, react-scripts, react-window, tone, uuidv4, vexflow, web-vitals, webmidi
![](https://i.imgur.com/vYjhk7L.png)

後端：bcryptjs, cors, dotenv-defaults, express, mongoose, nodemon  
![](https://i.imgur.com/3ep3NgM.png)

#### 在 localhost 安裝與測試之詳細步驟

##### 安裝步驟

1. 在將 repo clone 下來後進入到 wp1111 資料夾中的 final 資料夾
2. 於 final 中執行 yarn setup 指令
3. 於 final 中分別用兩個 terminal 執行 yarn start(前端)以及 yarn server(後端)

##### 測試步驟

見前述使用/操作方式

#### 分工

##### 前端:

生成樂譜:梁璿安
頁面設計:陳柏睿 梁璿安
axios:李昀儒 陳柏睿

##### 後端:

登入 API:李昀儒
樂曲 API:陳柏睿 梁璿安
MongoDB schema 設計:梁璿安 陳柏睿 李昀儒

#### 心得

梁璿安:這是困難重重的一次期末專題，從選定題材、找 library，到實際寫出樂譜產生的演算法和 debug，都耗費我們巨大的心力。感謝隊友們能至始至終持續且穩定的產出及維護網頁運作，且替我解決了不少前後端資料傳送的問題，在最後幾天雖然我得了感冒，還是很享受全心投入創作的過程。能做出成果，我其實很興奮，一來是因為自己在短短 4 個月吸收了足夠的網站設置入門知識，頗具成就感；另一方面，以前在用製譜軟體時就希望能擁有將 30 分鐘的漫長製譜在 3 分鐘內快速生成的軟件，而如今參與了這項演算法的開發，非常有意義。
李昀儒:這次的期末專題，從前後端的工作分配等以及 git 的學習等，都讓我在各方面學到了不少事情，還有像是這次由於會需要用到不少以前從來沒接觸過的 library 進行開發，這對我們來說也是一大考驗，不過，能夠從 0 開始不依靠其他人的 reference/skeleton code 完成一個完整的網路服務，也讓我感到相當的有成就感。
陳柏睿:這次的專題，除了是自己有興趣的主題外，也讓我更熟悉一個網站的架構跟寫法，雖然很累，但很有趣!
