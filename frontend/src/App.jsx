import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

//components
import Header from './components/Header'
import Footer from './components/Footer'

//pages
import Home from './pages/Home'
import AddPost from './pages/AddPost'
import SinglePost from './pages/SinglePost'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/newthought' element={<AddPost />}/>
              <Route path='/:id' element={<SinglePost />}/>
            </Routes>
          </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
