import './App.css'
import Header from './component/Header'
import Main from './component/Main'
import Footer from './component/Footer' 

function App() {
  return (
    <div id='root' className='todo-app__root'>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;