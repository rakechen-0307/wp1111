import React, { Component } from 'react'

export default class Input extends Component {

  i = 1

  handleKeyUp = (event)=>{
    const {keyCode, target} = event
    if (keyCode !== 13){
      return 
    }
    const task = {id:this.i, name:target.value, done:false}
    this.props.AddTask(task)
    this.i = this.i + 1
    this.clearInput(target)
  }

  clearInput = (target)=>{
    target.value = ""
  }

  render() {
    return (
      <input onKeyUp={this.handleKeyUp} className='todo-app__input' placeholder='What needs to be done?'/>
    )
  }
}
