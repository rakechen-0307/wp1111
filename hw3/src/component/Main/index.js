import React, { Component } from 'react'
import Header from '../Header'
import Input from '../Input'
import List from '../List'
import Footer from '../Footer'

export default class Main extends Component {

  state = {tasks:[]}

  AddTask = (task)=>{
    task.done = false
    task.shown = true
    const {tasks} = this.state
    const NewTasks = [...tasks,task]
    this.setState({tasks:NewTasks})
  }

  DeleteTask = (id)=>{
    const {tasks} = this.state
    const NewTasks = tasks.filter((task)=>{
      return task.id !== id
    })
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

  ShowAllTask = ()=>{
    const {tasks} = this.state
    const NewTasks = tasks.map((task)=>{
      return {...task, shown:true}
    })
    this.setState({tasks:NewTasks})
  }

  ShowActiveTask = ()=>{
    const {tasks} = this.state
    const NewTasks = tasks.map((task)=>{
      if (task.done === true){return {...task, shown:false}}
      else{return {...task, shown:true}}
    })
    this.setState({tasks:NewTasks})
  }

  ShowCompletedTask = ()=>{
    const {tasks} = this.state
    const NewTasks = tasks.map((task)=>{
      if (task.done === true){return {...task, shown:true}}
      else{return {...task, shown:false}}
    })
    this.setState({tasks:NewTasks})
  }

  ClearAllCompleted = ()=>{
    const {tasks} = this.state
    const NewTasks = tasks.filter((task)=>{
      return task.done === false
    })
    this.setState({tasks:NewTasks})
  }

  render() {
    const {tasks} = this.state
    return (
      <div id='root' className='todo-app__root'>
        <Header></Header>
        <div className='todo-app__main'>
          <Input AddTask={this.AddTask}></Input>
          <List tasks={tasks} UpdateTaskStatus={this.UpdateTaskStatus} DeleteTask={this.DeleteTask}></List>
        </div>
        <Footer tasks={tasks} ShowAllTask={this.ShowAllTask} ShowActiveTask={this.ShowActiveTask} ShowCompletedTask={this.ShowCompletedTask} ClearAllCompleted={this.ClearAllCompleted}></Footer>
      </div>
    )
  }
}
