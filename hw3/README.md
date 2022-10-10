# Web Programming HW#3

解說寫在 code 裡頭的 comment  
完成所有基礎功能與進階功能

## How to run the code(這是 Windows 版的流程，用 Mac 的人可能要再自己找一下怎麼開啟 react script，感謝)

#### Step 1

如果還沒有 WSL 可以照著下方這個網址的說明安裝 WSL  
[https://code.visualstudio.com/docs/remote/wsl](https://code.visualstudio.com/docs/remote/wsl)

#### Step 2

在 visual studio code 中打開終端機並選擇 WSL，或者在其他地方打開你的 WSL

#### Step 3

cd 到 hw3，執行 'yarn' 或 'yarn install'  
如果無法執行('yarn install'出現 error:ERROR: [Errno 2] No such file or directory: 'install')，試試看以下指令

    sudo apt remove cmdtest
    sudo apt remove yarn
    sudo npm install -g yarn

指令來源 : [https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install](https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install)  
如果還是不能 work 或是其他 error，可能就要麻煩再找找資料了 QQ

#### Step 4

執行 'npm start'
