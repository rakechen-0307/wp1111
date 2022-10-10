import React, { Component } from 'react'
import Input from '../Input'
import List from '../List'

export default class Main extends Component {

  state = {tasks:[]}

  AddTask = (task)=>{
    const {tasks} = this.state
    const NewTasks = [task,...tasks]
    this.setState({tasks:NewTasks})
  }

  UpdateTaskStatus = (id, done)=>{
    const {tasks} = this.state
    const NewTasks = tasks.map((task)=>{
      if (task.id === id){return {...task, done:done}}
      else{return task}
    })
    this.setState({tasks:NewTasks})
  }

  DeleteTask = (id)=>{
    const {tasks} = this.state
    const NewTasks = tasks.filter((task)=>{
      return task.id !== id
    })
    this.setState({tasks:NewTasks})
  }

  render() {
    const {tasks} = this.state
    return (
      <div className='todo-app__main'>
        <Input AddTask={this.AddTask}></Input>
        <List tasks={tasks} UpdateTaskStatus={this.UpdateTaskStatus} DeleteTask={this.DeleteTask}></List>
      </div>
    )
  }
}
