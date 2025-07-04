
import { Link, Route, Routes } from 'react-router-dom'
import './App.scss'
import News from './pages/News.jsx'
import GNews from './pages/GNews'
import GNewsDetail from './pages/GNewsDetail'
import Home from './pages/Home.jsx'
import MediaStackNews from './pages/MediaStackNews.jsx'
import MediaStackNewsDetails from './pages/MediaStackNewsDetails.jsx'
import CurrentsNews from './pages/CurrentsNews.jsx'
import CurrentsNewsDetail from './pages/CurrentsNewsDetail.jsx'
import Defult from './pages/defult.jsx'

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Defult />} >
          <Route path='/newsdata' element={<News />} />
          <Route path='/news/detail/:id' element={<GNewsDetail />} />

          <Route path='/mediastack-news' element={<MediaStackNews />} />
          <Route path='/mediastack-news/detail/:id' element={<MediaStackNewsDetails />} />


          <Route path='/currents-news' element={<CurrentsNews />} />
          <Route path='/currents-news/detail/:id' element={<CurrentsNewsDetail />} />
        </Route>
        {/* <Route path='/gnews' element={<GNews />} /> */}
      </Routes>

    </>
  )
}

export default App;
