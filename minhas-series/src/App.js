import React, { useState, useEffect } from 'react'
import Header from './Header'
import NewGenres from './NewGenres'
import UpdateGenres from './UpdateGenres'
import Genres from './genres'
import Home from './Home'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  const [data, setData] = useState({})
  useEffect(() =>{
    axios.get('/api').then(res => {
      setData(res.data)
    })
  }, [])
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/genres/new' exact component={NewGenres} />
        <Route path='/genres/:id' exact component={UpdateGenres} />
        <Route path='/genres' exact component={Genres} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  )
}

export default App
