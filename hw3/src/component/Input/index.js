import React, { Component } from 'react'

export default class Input extends Component {

  i = 1  // id的名稱

  // 處理輸入按下 enter 的反應
  handleKeyUp = (event)=>{
    const {keyCode, target} = event
    if (keyCode !== 13){  // 13 : enter鍵的 keyCode
      return 
    }
    const task = {id:this.i, name:target.value, done:false, shown:this.props.show_completed ? false : true}
    this.props.AddTask(task)
    this.i = this.i + 1
    this.clearInput(target)
  }

  // 按下 enter鍵後清除輸入的值
  clearInput = (target)=>{
    target.value = ""
  }

  render() {
    return (
      <input onKeyUp={this.handleKeyUp} className='todo-app__input' placeholder='What needs to be done?'/>
    )
  }
}
