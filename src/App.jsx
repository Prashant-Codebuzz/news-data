
import { Link, Route, Routes } from 'react-router-dom'
import './App.scss'
import News from './pages/News.jsx'
import GNews from './pages/GNews'
import GNewsDetail from './pages/GNewsDetail'

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<div className='text-center mt-5 pt-5'>
          <Link to="/newsdata" class="btn btn-success">Go to NewsData</Link>
        </div>} />
        <Route path='/newsdata' element={<News />} />
        <Route path='/news/detail/:id' element={<GNewsDetail />} />
        {/* <Route path='/gnews' element={<GNews />} /> */}
      </Routes>

    </>
  )
}

export default App;
